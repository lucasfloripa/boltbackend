import { ListProjectTasksController } from '@/presentation/controllers'
import { noContent, serverError, ok, badRequest } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols'
import { ListProjectTasks } from '@/domain/usecases'
import { mockTask } from '@/tests/domain/mocks'
import { mockListProjectTasks } from '@/tests/presentation/mocks'
import { mockValidationStub } from '@/tests/utils/mocks'

type SutTypes = {
  sut: ListProjectTasksController
  validationStub: Validation
  listProjectTasksStub: ListProjectTasks
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidationStub()
  const listProjectTasksStub = mockListProjectTasks()
  const sut = new ListProjectTasksController(listProjectTasksStub, validationStub)
  return { sut, listProjectTasksStub, validationStub }
}

describe('ListProjectTasks Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle({ projectId: 'any-project-id' })
    expect(validateSpy).toHaveBeenCalledWith({ projectId: 'any-project-id' })
  })
  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle({ projectId: 'any-project-id' })
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
  test('Should call listProjectTasks correctly', async () => {
    const { sut, listProjectTasksStub } = makeSut()
    const listProjectByUserSpy = jest.spyOn(listProjectTasksStub, 'list')
    await sut.handle({ projectId: 'any-project-id' })
    expect(listProjectByUserSpy).toHaveBeenCalledWith('any-project-id')
  })

  test('Should return 204 if listProjectTasks returns null', async () => {
    const { sut, listProjectTasksStub } = makeSut()
    jest.spyOn(listProjectTasksStub, 'list').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle({ projectId: 'any-project-id' })
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if listProjectTasks throws', async () => {
    const { sut, listProjectTasksStub } = makeSut()
    jest.spyOn(listProjectTasksStub, 'list').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle({ projectId: 'any-project-id' })
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ projectId: 'any-project-id' })
    expect(httpResponse).toEqual(ok([mockTask()]))
  })
})
