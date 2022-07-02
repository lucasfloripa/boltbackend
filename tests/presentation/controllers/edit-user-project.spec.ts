import { EditUserProject } from '@/domain/usecases'
import { EditUserProjectController } from '@/presentation/controllers'
import { badRequest, ok, serverError, notFound } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols'
import { mockMockEditUserProjectStub } from '@/tests/presentation/mocks'
import { mockValidationStub } from '@/tests/utils/mocks'

const mockRequest = (): EditUserProjectController.Params => ({
  projectId: 'any-project-id',
  title: 'any-project-title'
})

type SutTypes = {
  sut: EditUserProjectController
  editUserProjectStub: EditUserProject
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const editUserProjectStub = mockMockEditUserProjectStub()
  const validationStub = mockValidationStub()
  const sut = new EditUserProjectController(editUserProjectStub, validationStub)
  return { sut, editUserProjectStub, validationStub }
}

describe('EditUserProject Controller', () => {
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
  test('Should call editUserProject with correct values', async () => {
    const { sut, editUserProjectStub } = makeSut()
    const registerSpy = jest.spyOn(editUserProjectStub, 'edit')
    await sut.handle(mockRequest())
    expect(registerSpy).toHaveBeenCalledWith(mockRequest())
  })
  test('Should return 404 if editUserProject not found an project do edit', async () => {
    const { sut, editUserProjectStub } = makeSut()
    jest.spyOn(editUserProjectStub, 'edit').mockReturnValueOnce(Promise.resolve(false))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound())
  })
  test('Should return 500 if editUserProject throws', async () => {
    const { sut, editUserProjectStub } = makeSut()
    jest.spyOn(editUserProjectStub, 'edit').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok({ message: `Project ${request.title} updated!` }))
  })
})
