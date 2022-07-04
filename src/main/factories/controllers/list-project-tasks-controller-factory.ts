import { ListProjectTasksController } from '@/presentation/controllers'
import { makeDbListProjectTasks } from '@/main/factories/usecases'
import { makeListProjectTasksValidation } from '@/main/factories/validations'

export const makeListProjectTasksController = (): ListProjectTasksController => {
  return new ListProjectTasksController(makeDbListProjectTasks(), makeListProjectTasksValidation())
}
