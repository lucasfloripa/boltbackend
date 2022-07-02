import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { DeleteUserProject } from '@/domain/usecases'
import { badRequest, serverError, ok, notFound } from '@/presentation/helpers'

export class DeleteUserProjectController implements Controller {
  constructor (
    private readonly deleteUserProject: DeleteUserProject,
    private readonly validation: Validation
  ) {}

  async handle (request: DeleteUserProjectController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const isValid = await this.deleteUserProject.delete(request)
      if (!isValid) {
        return notFound()
      }
      return ok({ message: `Project ${request.projectId} deleted!` })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteUserProjectController {
  export type Params = {
    projectId: string
  }
}
