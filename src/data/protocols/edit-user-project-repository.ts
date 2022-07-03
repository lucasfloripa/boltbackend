export interface EditUserProjectRepository {
  edit: (data: EditUserProjectRepository.Params) => Promise<boolean>
}

export namespace EditUserProjectRepository {
  export type Params = {
    projectId: string
    title: string
  }
  export type Result = boolean
}
