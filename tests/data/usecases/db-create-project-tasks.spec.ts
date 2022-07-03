import { CreateProjectTask } from '@/domain/usecases'
import { DbCreateProjectTask } from '@/data/usecases'
import { LoadProjectByIdRepository, CreateProjectTaskRepository } from '@/data/protocols'
import { mockLoadProjectByIdRepositoryStub, mockCreateProjecTaskRepositoryStub } from '@/tests/data/mocks'

const mockRequest = (): CreateProjectTask.Params => ({
  projectId: 'any-project-id',
  description: 'any-description-id'
})

type SutTypes = {
  sut: DbCreateProjectTask
  loadProjectByIdRepositoryStub: LoadProjectByIdRepository
  createProjectTaskRepositoryStub: CreateProjectTaskRepository
}

const makeSut = (): SutTypes => {
  const loadProjectByIdRepositoryStub = mockLoadProjectByIdRepositoryStub()
  const createProjectTaskRepositoryStub = mockCreateProjecTaskRepositoryStub()
  const sut = new DbCreateProjectTask(loadProjectByIdRepositoryStub, createProjectTaskRepositoryStub)
  return { sut, loadProjectByIdRepositoryStub, createProjectTaskRepositoryStub }
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
    expect(createSpy).toHaveBeenCalledWith(mockRequest())
  })

  test('Should throw if createProjectTaskRepository throws', async () => {
    const { sut, createProjectTaskRepositoryStub } = makeSut()
    jest.spyOn(createProjectTaskRepositoryStub, 'create').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.create(mockRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a true on success', async () => {
    const { sut } = makeSut()
    const users = await sut.create(mockRequest())
    expect(users).toBeTruthy()
  })
})
