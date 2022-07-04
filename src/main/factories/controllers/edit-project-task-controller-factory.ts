import { EditProjectTaskController } from '@/presentation/controllers'
import { makeDbEditProjectTask } from '@/main/factories/usecases'
import { makeEditProjectTaskValidation } from '@/main/factories/validations'

export const makeEditProjectTaskController = (): EditProjectTaskController => {
  return new EditProjectTaskController(makeDbEditProjectTask(), makeEditProjectTaskValidation())
}
