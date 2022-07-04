import { DeleteProjectTaskRepository } from '@/data/protocols'

export const mockDeleteProjectTaskRepositoryStub = (): DeleteProjectTaskRepository => {
  class DeleteProjectTaskRepositoryStub implements DeleteProjectTaskRepository {
    async delete (taskId: string): Promise<DeleteProjectTaskRepository.Result> {
      return await Promise.resolve(true)
    }
  }
  return new DeleteProjectTaskRepositoryStub()
}
