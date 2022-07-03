import { EditUserProject } from '@/domain/usecases'
import { DbEditUserProject } from '@/data/usecases'
import { LoadProjectByIdRepository, EditUserProjectRepository } from '@/data/protocols'
import { mockLoadProjectByIdRepositoryStub, mockEditUserProjectRepositoryStub } from '@/tests/data/mocks'

const mockRequest = (): EditUserProject.Params => ({
  projectId: 'any-project-id',
  title: 'any-project-title'
})

type SutTypes = {
  sut: EditUserProject
  loadProjectByIdRepositoryStub: LoadProjectByIdRepository
  editUserProjectRepositoryStub: EditUserProjectRepository
}

const makeSut = (): SutTypes => {
  const loadProjectByIdRepositoryStub = mockLoadProjectByIdRepositoryStub()
  const editUserProjectRepositoryStub = mockEditUserProjectRepositoryStub()
  const sut = new DbEditUserProject(loadProjectByIdRepositoryStub, editUserProjectRepositoryStub)
  return { sut, loadProjectByIdRepositoryStub, editUserProjectRepositoryStub }
}

describe('DbEditUserProject Data Usecase', () => {
  test('Should call loadProjectByIdRepository correctly', async () => {
    const { sut, loadProjectByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadProjectByIdRepositoryStub, 'loadById')
    await sut.edit(mockRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith(mockRequest().projectId)
  })
  test('Should throw if loadProjectByIdRepository throws', async () => {
    const { sut, loadProjectByIdRepositoryStub } = makeSut()
    jest.spyOn(loadProjectByIdRepositoryStub, 'loadById').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.edit(mockRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should call editUserProjectRepository correctly', async () => {
    const { sut, editUserProjectRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(editUserProjectRepositoryStub, 'edit')
    await sut.edit(mockRequest())
    expect(createSpy).toHaveBeenCalledWith(mockRequest())
  })

  test('Should throw if editUserProjectRepository throws', async () => {
    const { sut, editUserProjectRepositoryStub } = makeSut()
    jest.spyOn(editUserProjectRepositoryStub, 'edit').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.edit(mockRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a true on success', async () => {
    const { sut } = makeSut()
    const users = await sut.edit(mockRequest())
    expect(users).toBeTruthy()
  })
})
