import { CreateUserProject } from '@/domain/usecases'
import { DbCreateUserProject } from '@/data/usecases'
import { LoadUserByIdRepository, CreateUserProjectRepository } from '@/data/protocols'
import { mockCreateUserProjectRepository, mockLoadUserByIdRepositoryStub } from '@/tests/data/mocks'

const mockRequest = (): CreateUserProject.Params => ({
  userId: 'any-user-id',
  title: 'any-project-title'
})

type SutTypes = {
  sut: DbCreateUserProject
  loadUserByIdRepositoryStub: LoadUserByIdRepository
  createUserProjectRepositoryStub: CreateUserProjectRepository
}

const makeSut = (): SutTypes => {
  const loadUserByIdRepositoryStub = mockLoadUserByIdRepositoryStub()
  const createUserProjectRepositoryStub = mockCreateUserProjectRepository()
  const sut = new DbCreateUserProject(loadUserByIdRepositoryStub, createUserProjectRepositoryStub)
  return { sut, loadUserByIdRepositoryStub, createUserProjectRepositoryStub }
}

describe('DbCreateUserProject Data Usecase', () => {
  test('Should call loadUserByIdRepository correctly', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadUserByIdRepositoryStub, 'loadById')
    await sut.create(mockRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith(mockRequest().userId)
  })

  test('Should throw if loadUserByIdRepository throws', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.create(mockRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should call createUserProjectRepository correctly', async () => {
    const { sut, createUserProjectRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(createUserProjectRepositoryStub, 'create')
    await sut.create(mockRequest())
    expect(createSpy).toHaveBeenCalledWith(mockRequest())
  })

  test('Should throw if createUserProjectRepository throws', async () => {
    const { sut, createUserProjectRepositoryStub } = makeSut()
    jest.spyOn(createUserProjectRepositoryStub, 'create').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.create(mockRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a true on success', async () => {
    const { sut } = makeSut()
    const users = await sut.create(mockRequest())
    expect(users).toBeTruthy()
  })
})
