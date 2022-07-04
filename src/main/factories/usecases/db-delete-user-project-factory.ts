import { DbDeleteUserProject } from '@/data/usecases'
import { ProjectMongoRepository } from '@/infra/db/mongodb'

export const makeDbDeleteUserProject = (): DbDeleteUserProject => {
  const projectMongoRepository = new ProjectMongoRepository()
  return new DbDeleteUserProject(projectMongoRepository, projectMongoRepository)
}
