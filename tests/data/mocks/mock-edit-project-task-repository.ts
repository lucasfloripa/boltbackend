import { EditProjectTaskRepository } from '@/data/protocols'

export const mockEditProjectTaskRepositoryStub = (): EditProjectTaskRepository => {
  class EditProjectTaskRepositoryStub implements EditProjectTaskRepository {
    async edit (data: EditProjectTaskRepository.Params): Promise<EditProjectTaskRepository.Result> {
      return await Promise.resolve(true)
    }
  }
  return new EditProjectTaskRepositoryStub()
}
