import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '@/utils/validators'

export const makeCreateProjectTaskValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['projectId', 'description']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
