import { RegisterUser } from '@/domain/usecases'
import { RegisterUserController } from '@/presentation/controllers'
import { EmailInUseError } from '@/presentation/errors'
import { forbidden } from '@/presentation/helpers'
import { mockRegisterUserParams } from '@/tests/domain/mocks'
import { mockRegisterUserStub } from '@/tests/presentation/mocks'

const mockRequest = (): RegisterUserController.Params => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

type SutTypes = {
  sut: RegisterUserController
  registerUserStub: RegisterUser
}

const makeSut = (): SutTypes => {
  const registerUserStub = mockRegisterUserStub()
  const sut = new RegisterUserController(registerUserStub)
  return { sut, registerUserStub }
}

describe('RegisterUser Controller', () => {
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
})
