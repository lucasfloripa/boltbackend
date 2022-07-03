import { CreateProjectTask } from '@/domain/usecases'

export const mockCreateProjectTask = (): CreateProjectTask => {
  class CreateProjectTaskStub implements CreateProjectTask {
    async create (taskParams: CreateProjectTask.Params): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new CreateProjectTaskStub()
}
