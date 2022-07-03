import { EditUserProject } from '@/domain/usecases'
import { LoadProjectByIdRepository, EditUserProjectRepository } from '@/data/protocols'

export class DbEditUserProject implements EditUserProject {
  constructor (
    private readonly loadProjectByIdRepository: LoadProjectByIdRepository,
    private readonly editUserProjectRepository: EditUserProjectRepository
  ) {}

  async edit (editParams: EditUserProject.Params): Promise<boolean> {
    const exist = await this.loadProjectByIdRepository.loadById(editParams.projectId)
    let isValid = false
    if (exist) {
      isValid = await this.editUserProjectRepository.edit(editParams)
    }
    return isValid
  }
}
