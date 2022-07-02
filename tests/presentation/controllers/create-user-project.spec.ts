import { CreateUserProject } from '@/domain/usecases'
import { CreateUserProjectController } from '@/presentation/controllers'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols'
import { mockMockCreateUserProjectStub } from '@/tests/presentation/mocks'
import { mockValidationStub } from '@/tests/utils/mocks'

const mockRequest = (): CreateUserProjectController.Params => ({
  title: 'any-project-title'
})

type SutTypes = {
  sut: CreateUserProjectController
  createUserProjectStub: CreateUserProject
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const createUserProjectStub = mockMockCreateUserProjectStub()
  const validationStub = mockValidationStub()
  const sut = new CreateUserProjectController(createUserProjectStub, validationStub)
  return { sut, createUserProjectStub, validationStub }
}

describe('CreateUserProject Controller', () => {
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
  test('Should call createUserProject with correct values', async () => {
    const { sut, createUserProjectStub } = makeSut()
    const registerSpy = jest.spyOn(createUserProjectStub, 'create')
    await sut.handle(mockRequest())
    expect(registerSpy).toHaveBeenCalledWith({ title: 'any-project-title' })
  })
  test('Should return 500 if RegisterUser throws', async () => {
    const { sut, createUserProjectStub } = makeSut()
    jest.spyOn(createUserProjectStub, 'create').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok({ message: `Project ${request.title} created!` }))
  })
})
