import { DeleteUserProject } from '@/domain/usecases'
import { DbDeleteUserProject } from '@/data/usecases'
import { LoadProjectByIdRepository, DeleteUserProjectRepository } from '@/data/protocols'
import { mockLoadProjectByIdRepositoryStub, mockDeleteUserProjectRepositoryStub } from '@/tests/data/mocks'

const mockRequest = (): DeleteUserProject.Params => ({
  projectId: 'any-project-id'
})

type SutTypes = {
  sut: DbDeleteUserProject
  loadProjectByIdRepositoryStub: LoadProjectByIdRepository
  deleteUserProjectRepositoryStub: DeleteUserProjectRepository
}

const makeSut = (): SutTypes => {
  const loadProjectByIdRepositoryStub = mockLoadProjectByIdRepositoryStub()
  const deleteUserProjectRepositoryStub = mockDeleteUserProjectRepositoryStub()
  const sut = new DbDeleteUserProject(loadProjectByIdRepositoryStub, deleteUserProjectRepositoryStub)
  return { sut, loadProjectByIdRepositoryStub, deleteUserProjectRepositoryStub }
}

describe('DbEditUserProject Data Usecase', () => {
  test('Should call loadProjectByIdRepository correctly', async () => {
    const { sut, loadProjectByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadProjectByIdRepositoryStub, 'loadById')
    await sut.delete(mockRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith(mockRequest().projectId)
  })
  test('Should throw if loadProjectByIdRepository throws', async () => {
    const { sut, loadProjectByIdRepositoryStub } = makeSut()
    jest.spyOn(loadProjectByIdRepositoryStub, 'loadById').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.delete(mockRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should call deleteUserProjectRepository correctly', async () => {
    const { sut, deleteUserProjectRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(deleteUserProjectRepositoryStub, 'delete')
    await sut.delete(mockRequest())
    expect(createSpy).toHaveBeenCalledWith('any-project-id')
  })

  test('Should throw if deleteUserProjectRepository throws', async () => {
    const { sut, deleteUserProjectRepositoryStub } = makeSut()
    jest.spyOn(deleteUserProjectRepositoryStub, 'delete').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.delete(mockRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a true on success', async () => {
    const { sut } = makeSut()
    const users = await sut.delete(mockRequest())
    expect(users).toBeTruthy()
  })
})
