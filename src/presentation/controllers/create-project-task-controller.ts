import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { CreateProjectTask } from '@/domain/usecases'
import { badRequest, serverError, ok, notFound } from '@/presentation/helpers'

export class CreateProjectTaskController implements Controller {
  constructor (
    private readonly createProjectTask: CreateProjectTask,
    private readonly validation: Validation
  ) {}

  async handle (request: CreateProjectTaskController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const isValid = await this.createProjectTask.create(request)
      if (!isValid) {
        return notFound()
      }
      return ok({ message: 'Task created!' })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CreateProjectTaskController {
  export type Params = {
    projectId: string
    description: string
  }
}
