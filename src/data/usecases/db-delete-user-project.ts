import { DeleteUserProject } from '@/domain/usecases'
import { LoadProjectByIdRepository, DeleteUserProjectRepository } from '@/data/protocols'

export class DbDeleteUserProject implements DeleteUserProject {
  constructor (
    private readonly loadProjectByIdRepository: LoadProjectByIdRepository,
    private readonly deleteUserProjectRepository: DeleteUserProjectRepository
  ) {}

  async delete (data: DeleteUserProject.Params): Promise<boolean> {
    const exist = await this.loadProjectByIdRepository.loadById(data.projectId)
    let isValid = false
    if (exist) {
      isValid = await this.deleteUserProjectRepository.delete(data.projectId)
    }
    return isValid
  }
}
