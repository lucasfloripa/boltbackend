import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { ListProjectTasks } from '@/domain/usecases'
import { badRequest, noContent, serverError, ok } from '@/presentation/helpers'

export class ListProjectTasksController implements Controller {
  constructor (
    private readonly listProjectTasks: ListProjectTasks,
    private readonly validation: Validation
  ) { }

  async handle (request: ListProjectTasksController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const tasks = await this.listProjectTasks.list(request.projectId)
      if (!tasks) {
        return noContent()
      }
      return ok(tasks)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace ListProjectTasksController {
  export type Params = {
    projectId: string
  }
}
