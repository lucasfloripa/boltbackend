import { ListProjectsByUserController } from '@/presentation/controllers'
import { noContent, serverError, ok, badRequest } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols'
import { ListProjectsByUser } from '@/domain/usecases'
import { mockProject } from '@/tests/domain/mocks'
import { mockListProjectsByUserStub } from '@/tests/presentation/mocks'
import { mockValidationStub } from '@/tests/utils/mocks'

type SutTypes = {
  sut: ListProjectsByUserController
  validationStub: Validation
  listProjectsByUserStub: ListProjectsByUser
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidationStub()
  const listProjectsByUserStub = mockListProjectsByUserStub()
  const sut = new ListProjectsByUserController(listProjectsByUserStub, validationStub)
  return { sut, listProjectsByUserStub, validationStub }
}

describe('ListProjectsByUser Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle({ userId: 'any_user_id' })
    expect(validateSpy).toHaveBeenCalledWith({ userId: 'any_user_id' })
  })
  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle({ userId: 'any_user_id' })
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
  test('Should call listProjectsByUser correctly', async () => {
    const { sut, listProjectsByUserStub } = makeSut()
    const listProjectByUserSpy = jest.spyOn(listProjectsByUserStub, 'list')
    await sut.handle({ userId: 'any_user_id' })
    expect(listProjectByUserSpy).toHaveBeenCalledWith('any_user_id')
  })

  test('Should return 204 if listProjectsByUser returns null', async () => {
    const { sut, listProjectsByUserStub } = makeSut()
    jest.spyOn(listProjectsByUserStub, 'list').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle({ userId: 'any_user_id' })
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if listProjectsByUser throws', async () => {
    const { sut, listProjectsByUserStub } = makeSut()
    jest.spyOn(listProjectsByUserStub, 'list').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle({ userId: 'any_user_id' })
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ userId: 'any_user_id' })
    expect(httpResponse).toEqual(ok([mockProject()]))
  })
})
