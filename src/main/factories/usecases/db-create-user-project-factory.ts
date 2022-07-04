import { DbCreateUserProject } from '@/data/usecases'
import { UserMongoRepository, ProjectMongoRepository } from '@/infra/db/mongodb'
import { UuidAdapter } from '@/infra/generators'

export const makeDbCreateUserProject = (): DbCreateUserProject => {
  const userMongoRepository = new UserMongoRepository()
  const projectMongoRepository = new ProjectMongoRepository()
  const idGenarator = new UuidAdapter()
  return new DbCreateUserProject(userMongoRepository, projectMongoRepository, idGenarator)
}
