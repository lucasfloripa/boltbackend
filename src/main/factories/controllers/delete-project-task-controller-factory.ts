import { DeleteProjectTaskController } from '@/presentation/controllers'
import { makeDbDeleteProjectTask } from '@/main/factories/usecases'
import { makeDeleteProjectTaskValidation } from '@/main/factories/validations'

export const makeDeleteProjectTaskController = (): DeleteProjectTaskController => {
  return new DeleteProjectTaskController(makeDbDeleteProjectTask(), makeDeleteProjectTaskValidation())
}
