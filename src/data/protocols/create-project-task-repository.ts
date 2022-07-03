export interface CreateProjectTaskRepository {
  create: (data: CreateProjectTaskRepository.Params) => Promise<boolean>
}

export namespace CreateProjectTaskRepository {
  export type Params = {
    projectId: string
    description: string
  }
  export type Result = boolean
}
