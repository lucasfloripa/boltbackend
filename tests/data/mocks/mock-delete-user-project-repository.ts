import { DeleteUserProjectRepository } from '@/data/protocols'

export const mockDeleteUserProjectRepositoryStub = (): DeleteUserProjectRepository => {
  class DeleteUserProjectRepositoryStub implements DeleteUserProjectRepository {
    async delete (projectId: string): Promise<DeleteUserProjectRepository.Result> {
      return await Promise.resolve(true)
    }
  }
  return new DeleteUserProjectRepositoryStub()
}
