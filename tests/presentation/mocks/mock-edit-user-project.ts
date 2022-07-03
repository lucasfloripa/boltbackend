import { EditUserProject } from '@/domain/usecases'

export const mockEditUserProjectStub = (): EditUserProject => {
  class EditUserProjectStub implements EditUserProject {
    async edit (editParams: EditUserProject.Params): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new EditUserProjectStub()
}
