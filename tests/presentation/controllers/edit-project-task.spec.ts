import { EditProjectTask } from '@/domain/usecases'
import { EditProjectTaskController } from '@/presentation/controllers'
import { badRequest, ok, serverError, notFound } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols'
import { mockEditProjectTaskStub } from '@/tests/presentation/mocks'
import { mockValidationStub } from '@/tests/utils/mocks'

const mockRequest = (): EditProjectTaskController.Params => ({
  taskId: 'any-task-id',
  projectId: 'any-project-id',
  description: 'any-new-description'
})

type SutTypes = {
  sut: EditProjectTaskController
  editProjectTaskController: EditProjectTask
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const editProjectTaskController = mockEditProjectTaskStub()
  const validationStub = mockValidationStub()
  const sut = new EditProjectTaskController(editProjectTaskController, validationStub)
  return { sut, editProjectTaskController, validationStub }
}

describe('EditProjectTask Controller', () => {
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
  test('Should call editProjectTask with correct values', async () => {
    const { sut, editProjectTaskController } = makeSut()
    const registerSpy = jest.spyOn(editProjectTaskController, 'edit')
    await sut.handle(mockRequest())
    expect(registerSpy).toHaveBeenCalledWith(mockRequest())
  })
  test('Should return 404 if editProjectTask not found an project do edit', async () => {
    const { sut, editProjectTaskController } = makeSut()
    jest.spyOn(editProjectTaskController, 'edit').mockReturnValueOnce(Promise.resolve(false))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound())
  })
  test('Should return 500 if editProjectTask throws', async () => {
    const { sut, editProjectTaskController } = makeSut()
    jest.spyOn(editProjectTaskController, 'edit').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok({ message: 'Task updated!' }))
  })
})
