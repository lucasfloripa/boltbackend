import { DbEditUserProject } from '@/data/usecases'
import { ProjectMongoRepository } from '@/infra/db/mongodb'

export const makeDbEditUserProject = (): DbEditUserProject => {
  const projectMongoRepository = new ProjectMongoRepository()
  return new DbEditUserProject(projectMongoRepository, projectMongoRepository)
}
