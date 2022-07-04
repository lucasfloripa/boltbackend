import { DeleteProjectTask } from '@/domain/usecases'
import { LoadTaskByIdRepository, DeleteProjectTaskRepository } from '@/data/protocols'

export class DbDeleteProjectTask implements DeleteProjectTask {
  constructor (
    private readonly loadTaskByIdRepository: LoadTaskByIdRepository,
    private readonly deleteProjectTaskRepository: DeleteProjectTaskRepository
  ) {}

  async delete (deleteParams: DeleteProjectTask.Params): Promise<boolean> {
    const exist = await this.loadTaskByIdRepository.loadById(deleteParams.taskId)
    let isValid = false
    if (exist) {
      isValid = await this.deleteProjectTaskRepository.delete(deleteParams.taskId)
    }
    return isValid
  }
}
