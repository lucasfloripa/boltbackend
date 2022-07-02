import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { EmailInUseError } from '@/presentation/errors'
import { badRequest, forbidden, serverError, ok } from '@/presentation/helpers'
import { RegisterUser } from '@/domain/usecases'

export class RegisterUserController implements Controller {
  constructor (
    private readonly registerUser: RegisterUser,
    private readonly validation: Validation
  ) { }

  async handle (request: RegisterUserController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const isValid = await this.registerUser.register(request)
      if (!isValid) {
        return forbidden(new EmailInUseError())
      }
      return ok({ message: `${request.email} register!` })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace RegisterUserController {
  export type Params = {
    email: string
    password: string
  }
}
