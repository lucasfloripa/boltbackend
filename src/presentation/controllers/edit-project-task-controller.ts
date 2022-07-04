import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { EditProjectTask } from '@/domain/usecases'
import { badRequest, serverError, ok, notFound } from '@/presentation/helpers'

export class EditProjectTaskController implements Controller {
  constructor (
    private readonly editProjectTask: EditProjectTask,
    private readonly validation: Validation
  ) {}

  async handle (request: EditProjectTaskController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const isValid = await this.editProjectTask.edit(request)
      if (!isValid) {
        return notFound()
      }
      return ok({ message: 'Task updated!' })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace EditProjectTaskController {
  export type Params = {
    taskId: string
    completed?: boolean
    description?: string
  }
}
