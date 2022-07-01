import { Controller, HttpResponse } from '@/presentation/protocols'
import { RegisterUser } from '@/domain/usecases'

export class RegisterUserController implements Controller {
  constructor (
    private readonly registerUser: RegisterUser
  ) { }

  async handle (request: RegisterUserController.Params): Promise<HttpResponse> {
    await this.registerUser.register(request)
    return null
  }
}

export namespace RegisterUserController {
  export type Params = {
    email: string
    password: string
  }
}
