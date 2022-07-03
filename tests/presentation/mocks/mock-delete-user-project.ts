import { DeleteUserProject } from '@/domain/usecases'

export const mockDeleteUserProjectStub = (): DeleteUserProject => {
  class DeleteUserProjectStub implements DeleteUserProject {
    async delete (projectId: DeleteUserProject.Params): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new DeleteUserProjectStub()
}
