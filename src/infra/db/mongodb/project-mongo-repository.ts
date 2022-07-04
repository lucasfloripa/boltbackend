import { ListProjectsByUserRepository, LoadProjectByIdRepository, EditUserProjectRepository, CreateUserProjectRepository, DeleteUserProjectRepository } from '@/data/protocols'
import { Project } from '@/domain/models'
import { MongoHelper } from './mongo-helper'

export class ProjectMongoRepository implements ListProjectsByUserRepository, LoadProjectByIdRepository, EditUserProjectRepository, CreateUserProjectRepository, DeleteUserProjectRepository {
  async listAll (userId: string): Promise<ListProjectsByUserRepository.Result> {
    const boltProjectCollection = await MongoHelper.getCollection('boltprojects')
    return await boltProjectCollection.find({ userId }, { projection: { _id: 0 } }).toArray()
  }

  async loadById (projectId: string): Promise<Project> {
    const boltProjectCollection = await MongoHelper.getCollection('boltprojects')
    return await boltProjectCollection.findOne({ id: projectId }, { projection: { _id: 0 } })
  }

  async edit (data: EditUserProjectRepository.Params): Promise<boolean> {
    const { projectId, title } = data
    const boltProjectCollection = await MongoHelper.getCollection('boltprojects')
    await boltProjectCollection.findOneAndUpdate(
      { id: projectId },
      {
        $set: {
          title
        }
      })
    return true
  }

  async create (data: CreateUserProjectRepository.Params): Promise<boolean> {
    const boltProjectCollection = await MongoHelper.getCollection('boltprojects')
    const result = await boltProjectCollection.insertOne(data)
    return result.ops[0] !== null
  }

  async delete (projectId: string): Promise<boolean> {
    const boltProjectCollection = await MongoHelper.getCollection('bolttasks')
    const wasDeleted = await boltProjectCollection.deleteOne({ id: projectId })
    if (wasDeleted.deletedCount === 1) {
      return true
    } else {
      return false
    }
  }
}
