import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { ListProjectsByUser } from '@/domain/usecases'
import { badRequest, noContent, serverError, ok } from '@/presentation/helpers'

export class ListProjectsByUserController implements Controller {
  constructor (
    private readonly listProjectsByUser: ListProjectsByUser,
    private readonly validation: Validation
  ) { }

  async handle (request: ListProjectsByUserController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const projects = await this.listProjectsByUser.list(request.userId)
      if (!projects) {
        return noContent()
      }
      return ok(projects)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace ListProjectsByUserController {
  export type Params = {
    userId: string
  }
}
