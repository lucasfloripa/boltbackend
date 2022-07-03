import { CreateUserProject } from '@/domain/usecases'
import { LoadUserByIdRepository, CreateUserProjectRepository } from '@/data/protocols'

export class DbCreateUserProject implements CreateUserProject {
  constructor (
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
    private readonly createUserProjectRepository: CreateUserProjectRepository
  ) {}

  async create (projectParams: CreateUserProject.Params): Promise<boolean> {
    const exist = await this.loadUserByIdRepository.loadById(projectParams.userId)
    let isValid = false
    if (exist) {
      isValid = await this.createUserProjectRepository.create(projectParams)
    }
    return isValid
  }
}
