import { CreateProjectTask } from '@/domain/usecases'
import { LoadProjectByIdRepository, CreateProjectTaskRepository } from '@/data/protocols'

export class DbCreateProjectTask implements CreateProjectTask {
  constructor (
    private readonly loadProjectByIdRepository: LoadProjectByIdRepository,
    private readonly createProjectTaskRepository: CreateProjectTaskRepository
  ) {}

  async create (projectParams: CreateProjectTask.Params): Promise<boolean> {
    const exist = await this.loadProjectByIdRepository.loadById(projectParams.projectId)
    let isValid = false
    if (exist) {
      isValid = await this.createProjectTaskRepository.create(projectParams)
    }
    return isValid
  }
}
