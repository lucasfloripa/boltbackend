import { LoadProjectByIdRepository } from '@/data/protocols'

export const mockLoadProjectByIdRepositoryStub = (): LoadProjectByIdRepository => {
  class LoadProjectByIdRepositoryStub implements LoadProjectByIdRepository {
    async loadById (id: string): Promise<LoadProjectByIdRepository.Result> {
      return {
        id: 'any-project-id',
        title: 'any-project-title'
      }
    }
  }
  return new LoadProjectByIdRepositoryStub()
}
