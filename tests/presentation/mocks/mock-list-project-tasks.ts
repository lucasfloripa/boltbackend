import { Task } from '@/domain/models'
import { ListProjectTasks } from '@/domain/usecases'
import { mockTask } from '@/tests/domain/mocks'

export const mockListProjectTasksStub = (): ListProjectTasks => {
  class ListProjectTasks implements ListProjectTasks {
    async list (): Promise<Task[]> {
      return [mockTask()]
    }
  }
  return new ListProjectTasks()
}
