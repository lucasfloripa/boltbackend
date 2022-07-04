import { EditProjectTask } from '@/domain/usecases'
import { LoadTaskByIdRepository, EditProjectTaskRepository } from '@/data/protocols'

export class DbEditProjectTask implements EditProjectTask {
  constructor (
    private readonly loadTaskByIdRepository: LoadTaskByIdRepository,
    private readonly editProjectTaskRepository: EditProjectTaskRepository
  ) {}

  async edit (editParams: EditProjectTask.Params): Promise<boolean> {
    const exist = await this.loadTaskByIdRepository.loadById(editParams.taskId)
    let isValid = false
    if (exist) {
      isValid = await this.editProjectTaskRepository.edit(editParams)
    }
    return isValid
  }
}
