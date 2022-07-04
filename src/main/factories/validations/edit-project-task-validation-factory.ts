import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '@/utils/validators'

export const makeEditProjectTaskValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['taskId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
