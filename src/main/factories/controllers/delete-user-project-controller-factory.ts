import { DeleteUserProjectController } from '@/presentation/controllers'
import { makeDbDeleteUserProject } from '@/main/factories/usecases'
import { makeDeleteUserProjectValidation } from '@/main/factories/validations'

export const makeDeleteUserProjectController = (): DeleteUserProjectController => {
  return new DeleteUserProjectController(makeDbDeleteUserProject(), makeDeleteUserProjectValidation())
}
