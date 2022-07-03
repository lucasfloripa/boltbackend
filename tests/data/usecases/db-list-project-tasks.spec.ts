import { DbListProjectTasks } from '@/data/usecases'
import { ListProjectTasksRepository } from '@/data/protocols'
import { mockListProjectTasksRepositoryStub } from '@/tests/data/mocks'
import { mockTask } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbListProjectTasks
  listProjectTasksRepositoryStub: ListProjectTasksRepository
}

const makeSut = (): SutTypes => {
  const listProjectTasksRepositoryStub = mockListProjectTasksRepositoryStub()
  const sut = new DbListProjectTasks(listProjectTasksRepositoryStub)
  return { sut, listProjectTasksRepositoryStub }
}

describe('DbListProjectTasks Data Usecase', () => {
  test('Should call listProjectTasksRepository correctly', async () => {
    const { sut, listProjectTasksRepositoryStub } = makeSut()
    const listAllSpy = jest.spyOn(listProjectTasksRepositoryStub, 'listAll')
    await sut.list('any-project-id')
    expect(listAllSpy).toHaveBeenCalled()
  })

  test('Should throw if listProjectTasksRepository throws', async () => {
    const { sut, listProjectTasksRepositoryStub } = makeSut()
    jest.spyOn(listProjectTasksRepositoryStub, 'listAll').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.list('any-project-id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return a list of projects on success', async () => {
    const { sut } = makeSut()
    const users = await sut.list('any-project-id')
    expect(users).toEqual([mockTask()])
  })
})
