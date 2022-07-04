import { CreateUserProjectController } from '@/presentation/controllers'
import { makeDbCreateUserProject } from '@/main/factories/usecases'
import { makeCreateUserProjectValidation } from '@/main/factories/validations'

export const makeCreateUserProjectController = (): CreateUserProjectController => {
  return new CreateUserProjectController(makeDbCreateUserProject(), makeCreateUserProjectValidation())
}
