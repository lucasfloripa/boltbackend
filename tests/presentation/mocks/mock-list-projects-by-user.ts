import { Project } from '@/domain/models'
import { ListProjectsByUser } from '@/domain/usecases'
import { mockProject } from '@/tests/domain/mocks'

export const mockListProjectsByUser = (): ListProjectsByUser => {
  class ListProjectsByUser implements ListProjectsByUser {
    async list (): Promise<Project[]> {
      return [mockProject()]
    }
  }
  return new ListProjectsByUser()
}
