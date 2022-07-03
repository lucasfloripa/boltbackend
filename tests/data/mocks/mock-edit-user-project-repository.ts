import { EditUserProjectRepository } from '@/data/protocols'

export const mockEditUserProjectRepositoryStub = (): EditUserProjectRepository => {
  class EditUserProjectRepositoryStub implements EditUserProjectRepository {
    async edit (data: EditUserProjectRepository.Params): Promise<EditUserProjectRepository.Result> {
      return await Promise.resolve(true)
    }
  }
  return new EditUserProjectRepositoryStub()
}
