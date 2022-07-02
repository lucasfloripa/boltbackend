import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { CreateUserProject } from '@/domain/usecases'
import { badRequest, serverError, ok } from '@/presentation/helpers'

export class CreateUserProjectController implements Controller {
  constructor (
    private readonly createUserProject: CreateUserProject,
    private readonly validation: Validation
  ) {}

  async handle (request: CreateUserProjectController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      await this.createUserProject.create(request)
      return ok({ message: `Project ${request.title} created!` })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CreateUserProjectController {
  export type Params = {
    title: string
  }
}
