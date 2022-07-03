import { ListProjectsByUser } from '@/domain/usecases'
import { ListProjectsByUserRepository } from '@/data/protocols'

export class DbListProjectsByUser implements ListProjectsByUser {
  constructor (
    private readonly listProjectsByUserRepository: ListProjectsByUserRepository
  ) {}

  async list (userId: string): Promise<ListProjectsByUser.Result> {
    return await this.listProjectsByUserRepository.listAll(userId)
  }
}
