import { CreateProjectTask } from '@/domain/usecases'
import { CreateProjectTaskController } from '@/presentation/controllers'
import { badRequest, ok, serverError, notFound } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols'
import { mockCreateProjectTaskStub } from '@/tests/presentation/mocks'
import { mockValidationStub } from '@/tests/utils/mocks'

const mockRequest = (): CreateProjectTaskController.Params => ({
  projectId: 'any-project-id',
  description: 'any-task-description'
})

type SutTypes = {
  sut: CreateProjectTaskController
  createProjectTaskStub: CreateProjectTask
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const createProjectTaskStub = mockCreateProjectTaskStub()
  const validationStub = mockValidationStub()
  const sut = new CreateProjectTaskController(createProjectTaskStub, validationStub)
  return { sut, createProjectTaskStub, validationStub }
}

describe('CreateProjectTask Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockRequest())
    expect(validateSpy).toHaveBeenCalledWith(mockRequest())
  })
  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
  test('Should call createProjectTask with correct values', async () => {
    const { sut, createProjectTaskStub } = makeSut()
    const registerSpy = jest.spyOn(createProjectTaskStub, 'create')
    await sut.handle(mockRequest())
    expect(registerSpy).toHaveBeenCalledWith({
      projectId: 'any-project-id',
      description: 'any-task-description'
    })
  })
  test('Should return 404 if createProjectTask not found an valid project for the task', async () => {
    const { sut, createProjectTaskStub } = makeSut()
    jest.spyOn(createProjectTaskStub, 'create').mockReturnValueOnce(Promise.resolve(false))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound())
  })
  test('Should return 500 if createProjectTask throws', async () => {
    const { sut, createProjectTaskStub } = makeSut()
    jest.spyOn(createProjectTaskStub, 'create').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok({ message: 'Task created!' }))
  })
})
