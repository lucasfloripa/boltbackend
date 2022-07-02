import { RegisterUser } from '@/domain/usecases'
import { RegisterUserController } from '@/presentation/controllers'
import { EmailInUseError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols'
import { mockRegisterUserParams } from '@/tests/domain/mocks'
import { mockRegisterUserStub, mockValidationStub } from '@/tests/presentation/mocks'

const mockRequest = (): RegisterUserController.Params => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

type SutTypes = {
  sut: RegisterUserController
  registerUserStub: RegisterUser
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const registerUserStub = mockRegisterUserStub()
  const validationStub = mockValidationStub()
  const sut = new RegisterUserController(registerUserStub, validationStub)
  return { sut, registerUserStub, validationStub }
}

describe('RegisterUser Controller', () => {
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
  test('Should call RegisterUser with correct values', async () => {
    const { sut, registerUserStub } = makeSut()
    const registerSpy = jest.spyOn(registerUserStub, 'register')
    await sut.handle(mockRequest())
    expect(registerSpy).toHaveBeenCalledWith(mockRegisterUserParams())
  })
  test('Should return 403 if RegisterUser returns false', async () => {
    const { sut, registerUserStub } = makeSut()
    jest.spyOn(registerUserStub, 'register').mockReturnValueOnce(Promise.resolve(false))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })
  test('Should return 500 if RegisterUser throws', async () => {
    const { sut, registerUserStub } = makeSut()
    jest.spyOn(registerUserStub, 'register').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok({ message: `${request.email} register!` }))
  })
})
