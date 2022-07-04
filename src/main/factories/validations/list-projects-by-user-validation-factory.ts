import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '@/utils/validators'

export const makeListProjectsByUserValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['userId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
