import { ListProjectTasks } from '@/domain/usecases'
import { ListProjectTasksRepository } from '@/data/protocols'

export class DbListProjectTasks implements ListProjectTasks {
  constructor (
    private readonly listProjectTasksRepository: ListProjectTasksRepository
  ) {}

  async list (projectId: string): Promise<ListProjectTasks.Result> {
    return await this.listProjectTasksRepository.listAll(projectId)
  }
}
