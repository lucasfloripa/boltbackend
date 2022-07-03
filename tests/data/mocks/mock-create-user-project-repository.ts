import { CreateUserProjectRepository } from '@/data/protocols'

export const mockCreateUserProjectRepositoryStub = (): CreateUserProjectRepository => {
  class CreateUserProjectRepositoryStub implements CreateUserProjectRepository {
    async create (data: CreateUserProjectRepository.Params): Promise<CreateUserProjectRepository.Result> {
      return await Promise.resolve(true)
    }
  }
  return new CreateUserProjectRepositoryStub()
}
