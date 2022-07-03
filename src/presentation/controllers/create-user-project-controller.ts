import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { CreateUserProject } from '@/domain/usecases'
import { badRequest, serverError, ok, notFound } from '@/presentation/helpers'

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
      const isValid = await this.createUserProject.create(request)
      if (!isValid) {
        return notFound()
      }
      return ok({ message: `Project ${request.title} created!` })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CreateUserProjectController {
  export type Params = {
    userId: string
    title: string
  }
}
