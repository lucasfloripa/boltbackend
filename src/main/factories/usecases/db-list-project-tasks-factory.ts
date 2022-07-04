import { DbListProjectTasks } from '@/data/usecases'
import { TaskMongoRepository } from '@/infra/db/mongodb'

export const makeDbListProjectTasks = (): DbListProjectTasks => {
  const taskMongoRepository = new TaskMongoRepository()
  return new DbListProjectTasks(taskMongoRepository)
}
