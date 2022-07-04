import { CreateProjectTaskController } from '@/presentation/controllers'
import { makeDbCreateProjectTask } from '@/main/factories/usecases'
import { makeCreateProjectTaskValidation } from '@/main/factories/validations'

export const makeCreateProjectTaskController = (): CreateProjectTaskController => {
  return new CreateProjectTaskController(makeDbCreateProjectTask(), makeCreateProjectTaskValidation())
}
