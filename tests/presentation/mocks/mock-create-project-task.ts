import { CreateProjectTask } from '@/domain/usecases'

export const mockCreateProjectTaskStub = (): CreateProjectTask => {
  class CreateProjectTaskStub implements CreateProjectTask {
    async create (taskParams: CreateProjectTask.Params): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new CreateProjectTaskStub()
}
