import { CreateUserProjectRepository } from '@/data/protocols'

export const mockCreateUserProjectRepository = (): CreateUserProjectRepository => {
  class CreateUserProjectRepositoryStub implements CreateUserProjectRepository {
    async create (data: CreateUserProjectRepository.Params): Promise<CreateUserProjectRepository.Result> {
      return await Promise.resolve(true)
    }
  }
  return new CreateUserProjectRepositoryStub()
}
