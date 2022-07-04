export interface CreateProjectTaskRepository {
  create: (data: CreateProjectTaskRepository.Params) => Promise<boolean>
}

export namespace CreateProjectTaskRepository {
  export type Params = {
    id: string
    projectId: string
    description: string
  }
  export type Result = boolean
}
