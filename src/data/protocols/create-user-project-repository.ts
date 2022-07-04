export interface CreateUserProjectRepository {
  create: (data: CreateUserProjectRepository.Params) => Promise<boolean>
}

export namespace CreateUserProjectRepository {
  export type Params = {
    id: string
    userId: string
    title: string
  }
  export type Result = boolean
}
