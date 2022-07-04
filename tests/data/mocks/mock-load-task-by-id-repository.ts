import { LoadTaskByIdRepository } from '@/data/protocols'
import { mockTask } from '@/tests/domain/mocks'

export const mockLoadTaskByIdRepositoryStub = (): LoadTaskByIdRepository => {
  class LoadTaskByIdRepositoryStub implements LoadTaskByIdRepository {
    async loadById (id: string): Promise<LoadTaskByIdRepository.Result> {
      return mockTask()
    }
  }
  return new LoadTaskByIdRepositoryStub()
}
