import { DbListProjectsByUser } from '@/data/usecases'
import { ListProjectsByUserRepository } from '@/data/protocols'
import { mockListProjectsByUserRepository } from '@/tests/data/mocks'
import { mockProject } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbListProjectsByUser
  listProjectsByUserRepositoryStub: ListProjectsByUserRepository
}

const makeSut = (): SutTypes => {
  const listProjectsByUserRepositoryStub = mockListProjectsByUserRepository()
  const sut = new DbListProjectsByUser(listProjectsByUserRepositoryStub)
  return { sut, listProjectsByUserRepositoryStub }
}

describe('DbListProjectsByUser Data Usecase', () => {
  test('Should call listProjectsByUserRepository correctly', async () => {
    const { sut, listProjectsByUserRepositoryStub } = makeSut()
    const listAllSpy = jest.spyOn(listProjectsByUserRepositoryStub, 'listAll')
    await sut.list('any-user-id')
    expect(listAllSpy).toHaveBeenCalled()
  })

  test('Should throw if listProjectsByUserRepository throws', async () => {
    const { sut, listProjectsByUserRepositoryStub } = makeSut()
    jest.spyOn(listProjectsByUserRepositoryStub, 'listAll').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.list('any-user-id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return a list of projects on success', async () => {
    const { sut } = makeSut()
    const users = await sut.list('any-user-id')
    expect(users).toEqual([mockProject()])
  })
})
