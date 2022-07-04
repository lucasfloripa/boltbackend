import { CreateProjectTask } from '@/domain/usecases'
import { DbCreateProjectTask } from '@/data/usecases'
import { LoadProjectByIdRepository, CreateProjectTaskRepository, IdGenerator } from '@/data/protocols'
import { mockLoadProjectByIdRepositoryStub, mockCreateProjecTaskRepositoryStub, mockIdGeneratorStub } from '@/tests/data/mocks'

const mockRequest = (): CreateProjectTask.Params => ({
  projectId: 'any-project-id',
  description: 'any-description-id'
})

type SutTypes = {
  sut: DbCreateProjectTask
  loadProjectByIdRepositoryStub: LoadProjectByIdRepository
  createProjectTaskRepositoryStub: CreateProjectTaskRepository
  idGeneratorStub: IdGenerator
}

const makeSut = (): SutTypes => {
  const loadProjectByIdRepositoryStub = mockLoadProjectByIdRepositoryStub()
  const createProjectTaskRepositoryStub = mockCreateProjecTaskRepositoryStub()
  const idGeneratorStub = mockIdGeneratorStub()
  const sut = new DbCreateProjectTask(loadProjectByIdRepositoryStub, createProjectTaskRepositoryStub, idGeneratorStub)
  return { sut, loadProjectByIdRepositoryStub, createProjectTaskRepositoryStub, idGeneratorStub }
}

describe('DbCreateProjectTask Data Usecase', () => {
  test('Should call loadProjectByIdRepository correctly', async () => {
    const { sut, loadProjectByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadProjectByIdRepositoryStub, 'loadById')
    await sut.create(mockRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith(mockRequest().projectId)
  })

  test('Should throw if loadUserByIdRepository throws', async () => {
    const { sut, loadProjectByIdRepositoryStub } = makeSut()
    jest.spyOn(loadProjectByIdRepositoryStub, 'loadById').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.create(mockRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should call createProjectTaskRepository correctly', async () => {
    const { sut, createProjectTaskRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(createProjectTaskRepositoryStub, 'create')
    await sut.create(mockRequest())
    expect(createSpy).toHaveBeenCalledWith({ id: 'generated_id', ...mockRequest() })
  })

  test('Should throw if createProjectTaskRepository throws', async () => {
    const { sut, createProjectTaskRepositoryStub } = makeSut()
    jest.spyOn(createProjectTaskRepositoryStub, 'create').mockImplementationOnce(async () => await Promise.reject(new Error()))
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
