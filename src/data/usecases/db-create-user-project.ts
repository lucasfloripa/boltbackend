import { CreateUserProject } from '@/domain/usecases'
import { LoadUserByIdRepository, CreateUserProjectRepository, IdGenerator } from '@/data/protocols'

export class DbCreateUserProject implements CreateUserProject {
  constructor (
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
    private readonly createUserProjectRepository: CreateUserProjectRepository,
    private readonly idGenerator: IdGenerator
  ) {}

  async create (projectParams: CreateUserProject.Params): Promise<boolean> {
    const exist = await this.loadUserByIdRepository.loadById(projectParams.userId)
    let isValid = false
    if (exist) {
      const id = await this.idGenerator.generate()
      isValid = await this.createUserProjectRepository.create({ id, ...projectParams })
    }
    return isValid
  }
}
