import { EditUserProjectController } from '@/presentation/controllers'
import { makeDbEditUserProject } from '@/main/factories/usecases'
import { makeEditUserProjectValidation } from '@/main/factories/validations'

export const makeEditUserProjectController = (): EditUserProjectController => {
  return new EditUserProjectController(makeDbEditUserProject(), makeEditUserProjectValidation())
}
