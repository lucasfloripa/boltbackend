import { CreateProjectTask } from '@/domain/usecases'
import { LoadProjectByIdRepository, CreateProjectTaskRepository, IdGenerator } from '@/data/protocols'

export class DbCreateProjectTask implements CreateProjectTask {
  constructor (
    private readonly loadProjectByIdRepository: LoadProjectByIdRepository,
    private readonly createProjectTaskRepository: CreateProjectTaskRepository,
    private readonly idGenerator: IdGenerator
  ) {}

  async create (projectParams: CreateProjectTask.Params): Promise<boolean> {
    const exist = await this.loadProjectByIdRepository.loadById(projectParams.projectId)
    let isValid = false
    if (exist) {
      const id = await this.idGenerator.generate()
      isValid = await this.createProjectTaskRepository.create({ id, ...projectParams })
    }
    return isValid
  }
}
