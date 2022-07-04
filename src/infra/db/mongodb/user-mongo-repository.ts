import { LoadUserByEmailRepository, LoadUserByIdRepository, CheckUserByEmailRepository, RegisterUserRepository } from '@/data/protocols'
import { MongoHelper } from './mongo-helper'

export class UserMongoRepository implements LoadUserByEmailRepository, LoadUserByIdRepository, CheckUserByEmailRepository, RegisterUserRepository {
  async loadByEmail (email: string): Promise<LoadUserByEmailRepository.Result> {
    const boltUserCollection = await MongoHelper.getCollection('boltusers')
    return await boltUserCollection.findOne({ email }, { projection: { _id: 0 } })
  }

  async loadById (id: string): Promise<LoadUserByIdRepository.Result> {
    const boltUserCollection = await MongoHelper.getCollection('boltusers')
    return await boltUserCollection.findOne({ id }, { projection: { _id: 0 } })
  }

  async checkByEmail (email: string): Promise<boolean> {
    const boltUserCollection = await MongoHelper.getCollection('boltusers')
    const user = await boltUserCollection.findOne(
      { email },
      {
        projection: {
          _id: 1
        }
      }
    )
    return user !== null
  }

  async register (data: RegisterUserRepository.Params): Promise<boolean> {
    const boltUserCollection = await MongoHelper.getCollection('boltusers')
    const result = await boltUserCollection.insertOne(data)
    return result.ops[0] !== null
  }
}
