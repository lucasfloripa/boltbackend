import { Controller, HttpResponse } from '@/presentation/protocols'
import { EmailInUseError } from '@/presentation/errors'
import { forbidden } from '@/presentation/helpers'
import { RegisterUser } from '@/domain/usecases'

export class RegisterUserController implements Controller {
  constructor (
    private readonly registerUser: RegisterUser
  ) { }

  async handle (request: RegisterUserController.Params): Promise<HttpResponse> {
    const isValid = await this.registerUser.register(request)
    if (!isValid) {
      return forbidden(new EmailInUseError())
    }
    return null
  }
}

export namespace RegisterUserController {
  export type Params = {
    email: string
    password: string
  }
}
