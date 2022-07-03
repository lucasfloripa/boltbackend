import { CreateProjectTaskRepository } from '@/data/protocols'

export const mockCreateProjecTaskRepositoryStub = (): CreateProjectTaskRepository => {
  class CreateProjectTaskRepositoryStub implements CreateProjectTaskRepository {
    async create (data: CreateProjectTaskRepository.Params): Promise<CreateProjectTaskRepository.Result> {
      return await Promise.resolve(true)
    }
  }
  return new CreateProjectTaskRepositoryStub()
}
