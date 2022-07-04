import { DbListProjectsByUser } from '@/data/usecases'
import { ProjectMongoRepository } from '@/infra/db/mongodb'

export const makeDbListProjectsByUser = (): DbListProjectsByUser => {
  const projectMongoRepository = new ProjectMongoRepository()
  return new DbListProjectsByUser(projectMongoRepository)
}
