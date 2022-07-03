import { ListProjectsByUserRepository } from '@/data/protocols'
import { mockProject } from '@/tests/domain/mocks'

export const mockListProjectsByUserRepository = (): ListProjectsByUserRepository => {
  class ListProjectsByUserRepositoryStub implements ListProjectsByUserRepository {
    async listAll (userId: string): Promise<ListProjectsByUserRepository.Result> {
      return [mockProject()]
    }
  }
  return new ListProjectsByUserRepositoryStub()
}
