import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { DeleteProjectTask } from '@/domain/usecases'
import { badRequest, serverError, ok, notFound } from '@/presentation/helpers'

export class DeleteProjectTaskController implements Controller {
  constructor (
    private readonly deleteProjectTask: DeleteProjectTask,
    private readonly validation: Validation
  ) {}

  async handle (request: DeleteProjectTaskController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const isValid = await this.deleteProjectTask.delete(request)
      if (!isValid) {
        return notFound()
      }
      return ok({ message: `Task with id ${request.taskId} deleted!` })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteProjectTaskController {
  export type Params = {
    taskId: string
  }
}
