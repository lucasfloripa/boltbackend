import { EditProjectTask } from '@/domain/usecases'
import { DbEditProjectTask } from '@/data/usecases'
import { LoadTaskByIdRepository, EditProjectTaskRepository } from '@/data/protocols'
import { mockLoadTaskByIdRepositoryStub, mockEditProjectTaskRepositoryStub } from '@/tests/data/mocks'

const mockRequest = (): EditProjectTask.Params => ({
  taskId: 'any-task-id',
  description: 'any-task-description'
})

type SutTypes = {
  sut: DbEditProjectTask
  loadTaskByIdRepositoryStub: LoadTaskByIdRepository
  editProjectTaskRepositoryStub: EditProjectTaskRepository
}

const makeSut = (): SutTypes => {
  const loadTaskByIdRepositoryStub = mockLoadTaskByIdRepositoryStub()
  const editProjectTaskRepositoryStub = mockEditProjectTaskRepositoryStub()
  const sut = new DbEditProjectTask(loadTaskByIdRepositoryStub, editProjectTaskRepositoryStub)
  return { sut, loadTaskByIdRepositoryStub, editProjectTaskRepositoryStub }
}

describe('DbEditUserProject Data Usecase', () => {
  test('Should call loadTaskByIdRepository correctly', async () => {
    const { sut, loadTaskByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadTaskByIdRepositoryStub, 'loadById')
    await sut.edit(mockRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith(mockRequest().taskId)
  })
  test('Should throw if loadTaskByIdRepository throws', async () => {
    const { sut, loadTaskByIdRepositoryStub } = makeSut()
    jest.spyOn(loadTaskByIdRepositoryStub, 'loadById').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.edit(mockRequest())
    await expect(promise).rejects.toThrow()
  })
  test('Should call editProjectTaskRepository correctly', async () => {
    const { sut, editProjectTaskRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(editProjectTaskRepositoryStub, 'edit')
    await sut.edit(mockRequest())
    expect(createSpy).toHaveBeenCalledWith(mockRequest())
  })
  test('Should throw if editProjectTaskRepository throws', async () => {
    const { sut, editProjectTaskRepositoryStub } = makeSut()
    jest.spyOn(editProjectTaskRepositoryStub, 'edit').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.edit(mockRequest())
    await expect(promise).rejects.toThrow()
  })
  test('Should return a true on success', async () => {
    const { sut } = makeSut()
    const users = await sut.edit(mockRequest())
    expect(users).toBeTruthy()
  })
})
