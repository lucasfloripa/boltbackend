import { CreateUserProject } from '@/domain/usecases'
import { DbCreateUserProject } from '@/data/usecases'
import { LoadUserByIdRepository, CreateUserProjectRepository, IdGenerator } from '@/data/protocols'
import { mockCreateUserProjectRepositoryStub, mockLoadUserByIdRepositoryStub, mockIdGeneratorStub } from '@/tests/data/mocks'

const mockRequest = (): CreateUserProject.Params => ({
  userId: 'any-user-id',
  title: 'any-project-title'
})

type SutTypes = {
  sut: DbCreateUserProject
  loadUserByIdRepositoryStub: LoadUserByIdRepository
  createUserProjectRepositoryStub: CreateUserProjectRepository
  idGeneratorStub: IdGenerator
}

const makeSut = (): SutTypes => {
  const loadUserByIdRepositoryStub = mockLoadUserByIdRepositoryStub()
  const createUserProjectRepositoryStub = mockCreateUserProjectRepositoryStub()
  const idGeneratorStub = mockIdGeneratorStub()
  const sut = new DbCreateUserProject(loadUserByIdRepositoryStub, createUserProjectRepositoryStub, idGeneratorStub)
  return { sut, loadUserByIdRepositoryStub, createUserProjectRepositoryStub, idGeneratorStub }
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
    expect(createSpy).toHaveBeenCalledWith({ id: 'generated_id', ...mockRequest() })
  })

  test('Should throw if createUserProjectRepository throws', async () => {
    const { sut, createUserProjectRepositoryStub } = makeSut()
    jest.spyOn(createUserProjectRepositoryStub, 'create').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.create(mockRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should call idGenerator correctly', async () => {
    const { sut, idGeneratorStub } = makeSut()
    const generateSpy = jest.spyOn(idGeneratorStub, 'generate')
    await sut.create(mockRequest())
    expect(generateSpy).toHaveBeenCalled()
  })

  test('Should throw if idGenerator throws', async () => {
    const { sut, idGeneratorStub } = makeSut()
    jest.spyOn(idGeneratorStub, 'generate').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.create(mockRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a true on success', async () => {
    const { sut } = makeSut()
    const users = await sut.create(mockRequest())
    expect(users).toBeTruthy()
  })
})
