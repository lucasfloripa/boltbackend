import { DbCreateProjectTask } from '@/data/usecases'
import { TaskMongoRepository, ProjectMongoRepository } from '@/infra/db/mongodb'
import { UuidAdapter } from '@/infra/generators'

export const makeDbCreateProjectTask = (): DbCreateProjectTask => {
  const taskMongoRepository = new TaskMongoRepository()
  const projectMongoRepository = new ProjectMongoRepository()
  const idGenarator = new UuidAdapter()
  return new DbCreateProjectTask(projectMongoRepository, taskMongoRepository, idGenarator)
}
