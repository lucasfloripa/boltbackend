import { DbEditProjectTask } from '@/data/usecases'
import { TaskMongoRepository } from '@/infra/db/mongodb'

export const makeDbEditProjectTask = (): DbEditProjectTask => {
  const taskMongoRepository = new TaskMongoRepository()
  return new DbEditProjectTask(taskMongoRepository, taskMongoRepository)
}
