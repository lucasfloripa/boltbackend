export interface CreateUserProjectRepository {
  create: (data: CreateUserProjectRepository.Params) => Promise<boolean>
}

export namespace CreateUserProjectRepository {
  export type Params = {
    userId: string
    title: string
  }
  export type Result = boolean
}
