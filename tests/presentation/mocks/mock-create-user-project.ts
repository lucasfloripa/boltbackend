import { CreateUserProject } from '@/domain/usecases'

export const mockCreateUserProjectStub = (): CreateUserProject => {
  class CreateUserProjectStub implements CreateUserProject {
    async create (projectParams: CreateUserProject.Params): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new CreateUserProjectStub()
}
