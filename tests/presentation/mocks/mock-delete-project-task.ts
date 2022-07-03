import { DeleteProjectTask } from '@/domain/usecases'

export const mockDeleteProjectTaskStub = (): DeleteProjectTask => {
  class DeleteProjectTaskStub implements DeleteProjectTask {
    async delete (taskId: DeleteProjectTask.Params): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new DeleteProjectTaskStub()
}
