import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { EditUserProject } from '@/domain/usecases'
import { badRequest, serverError, ok, notFound } from '@/presentation/helpers'

export class EditUserProjectController implements Controller {
  constructor (
    private readonly editUserProject: EditUserProject,
    private readonly validation: Validation
  ) {}

  async handle (request: EditUserProjectController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const isValid = await this.editUserProject.edit(request)
      if (!isValid) {
        return notFound()
      }
      return ok({ message: `Project ${request.title} updated!` })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace EditUserProjectController {
  export type Params = {
    projectId: string
    title: string
  }
}
