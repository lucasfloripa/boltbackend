import { EditProjectTask } from '@/domain/usecases'

export const mockEditProjectTaskStub = (): EditProjectTask => {
  class EditProjectTaskStub implements EditProjectTask {
    async edit (editParams: EditProjectTask.Params): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new EditProjectTaskStub()
}
