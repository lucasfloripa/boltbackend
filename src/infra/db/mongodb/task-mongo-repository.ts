import { LoadTaskByIdRepository, EditProjectTaskRepository, ListProjectTasksRepository, CreateProjectTaskRepository, DeleteProjectTaskRepository } from '@/data/protocols'
import { Task } from '@/domain/models'
import { MongoHelper } from './mongo-helper'

export class TaskMongoRepository implements LoadTaskByIdRepository, EditProjectTaskRepository, ListProjectTasksRepository, CreateProjectTaskRepository, DeleteProjectTaskRepository {
  async loadById (taskId: string): Promise<Task> {
    const boltTaskCollection = await MongoHelper.getCollection('bolttasks')
    return await boltTaskCollection.findOne({ id: taskId }, { projection: { _id: 0 } })
  }

  async edit (data: EditProjectTaskRepository.Params): Promise<boolean> {
    const { taskId, completed, description } = data
    const boltTaskCollection = await MongoHelper.getCollection('bolttasks')
    await boltTaskCollection.findOneAndUpdate(
      { id: taskId },
      {
        $set: {
          description,
          completed
        }
      })
    return true
  }

  async listAll (projectId: string): Promise<ListProjectTasksRepository.Result> {
    const boltTaskCollection = await MongoHelper.getCollection('bolttasks')
    return await boltTaskCollection.find({ projectId }, { projection: { _id: 0 } }).toArray()
  }

  async create (data: CreateProjectTaskRepository.Params): Promise<boolean> {
    const boltTaskCollection = await MongoHelper.getCollection('bolttasks')
    const result = await boltTaskCollection.insertOne({ ...data, creationDate: new Date(), completed: false })
    return result.ops[0] !== null
  }

  async delete (taskId: string): Promise<boolean> {
    const boltTaskCollection = await MongoHelper.getCollection('bolttasks')
    const wasDeleted = await boltTaskCollection.deleteOne({ id: taskId })
    if (wasDeleted.deletedCount === 1) {
      return true
    } else {
      return false
    }
  }
}
