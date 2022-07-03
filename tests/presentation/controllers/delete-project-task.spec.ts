import { DeleteProjectTask } from '@/domain/usecases'
import { DeleteProjectTaskController } from '@/presentation/controllers'
import { badRequest, ok, serverError, notFound } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols'
import { mockDeleteProjectTaskStub } from '@/tests/presentation/mocks'
import { mockValidationStub } from '@/tests/utils/mocks'

const mockRequest = (): DeleteProjectTaskController.Params => ({
  taskId: 'any-task-id'
})

type SutTypes = {
  sut: DeleteProjectTaskController
  deleteProjectTaskStub: DeleteProjectTask
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const deleteProjectTaskStub = mockDeleteProjectTaskStub()
  const validationStub = mockValidationStub()
  const sut = new DeleteProjectTaskController(deleteProjectTaskStub, validationStub)
  return { sut, deleteProjectTaskStub, validationStub }
}

describe('DeleteProjectTask Controller', () => {
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
  test('Should call deleteProjectTask with correct values', async () => {
    const { sut, deleteProjectTaskStub } = makeSut()
    const registerSpy = jest.spyOn(deleteProjectTaskStub, 'delete')
    await sut.handle(mockRequest())
    expect(registerSpy).toHaveBeenCalledWith(mockRequest())
  })
  test('Should return 404 if deleteProjectTask not found an project do edit', async () => {
    const { sut, deleteProjectTaskStub } = makeSut()
    jest.spyOn(deleteProjectTaskStub, 'delete').mockReturnValueOnce(Promise.resolve(false))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound())
  })
  test('Should return 500 if deleteProjectTask throws', async () => {
    const { sut, deleteProjectTaskStub } = makeSut()
    jest.spyOn(deleteProjectTaskStub, 'delete').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok({ message: `Task with id ${request.taskId} deleted!` }))
  })
})
