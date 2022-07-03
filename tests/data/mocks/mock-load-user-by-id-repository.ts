import { LoadUserByIdRepository } from '@/data/protocols'

export const mockLoadUserByIdRepositoryStub = (): LoadUserByIdRepository => {
  class LoadUserByIdRepositoryStub implements LoadUserByIdRepository {
    async loadById (id: string): Promise<LoadUserByIdRepository.Result> {
      return {
        id: 'any_id',
        email: 'any_email',
        password: 'hashed_password'
      }
    }
  }
  return new LoadUserByIdRepositoryStub()
}
