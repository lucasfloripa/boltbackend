import { DeleteUserProject } from '@/domain/usecases'
import { DeleteUserProjectController } from '@/presentation/controllers'
import { badRequest, ok, serverError, notFound } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols'
import { mockMockDeleteUserProjectStub } from '@/tests/presentation/mocks'
import { mockValidationStub } from '@/tests/utils/mocks'

const mockRequest = (): DeleteUserProjectController.Params => ({
  projectId: 'any-project-id'
})

type SutTypes = {
  sut: DeleteUserProjectController
  deleteUserProjectStub: DeleteUserProject
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const deleteUserProjectStub = mockMockDeleteUserProjectStub()
  const validationStub = mockValidationStub()
  const sut = new DeleteUserProjectController(deleteUserProjectStub, validationStub)
  return { sut, deleteUserProjectStub, validationStub }
}

describe('DeleteUserProject Controller', () => {
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
  test('Should call deleteUserProject with correct values', async () => {
    const { sut, deleteUserProjectStub } = makeSut()
    const registerSpy = jest.spyOn(deleteUserProjectStub, 'delete')
    await sut.handle(mockRequest())
    expect(registerSpy).toHaveBeenCalledWith(mockRequest())
  })
  test('Should return 404 if editUserProject not found an project do edit', async () => {
    const { sut, deleteUserProjectStub } = makeSut()
    jest.spyOn(deleteUserProjectStub, 'delete').mockReturnValueOnce(Promise.resolve(false))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound())
  })
  test('Should return 500 if editUserProject throws', async () => {
    const { sut, deleteUserProjectStub } = makeSut()
    jest.spyOn(deleteUserProjectStub, 'delete').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok({ message: `Project ${request.projectId} deleted!` }))
  })
})
