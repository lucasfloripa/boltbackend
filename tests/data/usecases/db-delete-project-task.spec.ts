import { DeleteProjectTask } from '@/domain/usecases'
import { DbDeleteProjectTask } from '@/data/usecases'
import { LoadTaskByIdRepository, DeleteProjectTaskRepository } from '@/data/protocols'
import { mockLoadTaskByIdRepositoryStub, mockDeleteProjectTaskRepositoryStub } from '@/tests/data/mocks'

const mockRequest = (): DeleteProjectTask.Params => ({
  taskId: 'any-task-id'
})

type SutTypes = {
  sut: DbDeleteProjectTask
  loadTaskByIdRepositoryStub: LoadTaskByIdRepository
  deleteProjectTaskRepositoryStub: DeleteProjectTaskRepository
}

const makeSut = (): SutTypes => {
  const loadTaskByIdRepositoryStub = mockLoadTaskByIdRepositoryStub()
  const deleteProjectTaskRepositoryStub = mockDeleteProjectTaskRepositoryStub()
  const sut = new DbDeleteProjectTask(loadTaskByIdRepositoryStub, deleteProjectTaskRepositoryStub)
  return { sut, loadTaskByIdRepositoryStub, deleteProjectTaskRepositoryStub }
}

describe('DbDeleteProjectTask Data Usecase', () => {
  test('Should call loadTaskByIdRepository correctly', async () => {
    const { sut, loadTaskByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadTaskByIdRepositoryStub, 'loadById')
    await sut.delete(mockRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith(mockRequest().taskId)
  })
  test('Should throw if loadTaskByIdRepository throws', async () => {
    const { sut, loadTaskByIdRepositoryStub } = makeSut()
    jest.spyOn(loadTaskByIdRepositoryStub, 'loadById').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.delete(mockRequest())
    await expect(promise).rejects.toThrow()
  })
  test('Should call deleteProjectTaskRepository correctly', async () => {
    const { sut, deleteProjectTaskRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(deleteProjectTaskRepositoryStub, 'delete')
    await sut.delete(mockRequest())
    expect(createSpy).toHaveBeenCalledWith(mockRequest().taskId)
  })
  test('Should throw if deleteProjectTaskRepository throws', async () => {
    const { sut, deleteProjectTaskRepositoryStub } = makeSut()
    jest.spyOn(deleteProjectTaskRepositoryStub, 'delete').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.delete(mockRequest())
    await expect(promise).rejects.toThrow()
  })
  test('Should return a true on success', async () => {
    const { sut } = makeSut()
    const users = await sut.delete(mockRequest())
    expect(users).toBeTruthy()
  })
})
