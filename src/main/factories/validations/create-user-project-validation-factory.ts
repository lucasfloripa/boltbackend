import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '@/utils/validators'

export const makeCreateUserProjectValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['userId', 'title']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
