import { ListProjectsByUserController } from '@/presentation/controllers'
import { makeDbListProjectsByUser } from '@/main/factories/usecases'
import { makeListProjectsByUserValidation } from '@/main/factories/validations'

export const makeListProjectsByUserController = (): ListProjectsByUserController => {
  return new ListProjectsByUserController(makeDbListProjectsByUser(), makeListProjectsByUserValidation())
}
