import { ListProjectTasksRepository } from '@/data/protocols'
import { mockTask } from '@/tests/domain/mocks'

export const mockListProjectTasksRepositoryStub = (): ListProjectTasksRepository => {
  class ListProjectTasksRepositoryStub implements ListProjectTasksRepository {
    async listAll (projectId: string): Promise<ListProjectTasksRepository.Result> {
      return [mockTask()]
    }
  }
  return new ListProjectTasksRepositoryStub()
}
