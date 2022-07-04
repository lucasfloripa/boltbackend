import { DbDeleteProjectTask } from '@/data/usecases'
import { TaskMongoRepository } from '@/infra/db/mongodb'

export const makeDbDeleteProjectTask = (): DbDeleteProjectTask => {
  const taskMongoRepository = new TaskMongoRepository()
  return new DbDeleteProjectTask(taskMongoRepository, taskMongoRepository)
}
