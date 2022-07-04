export interface DeleteUserProjectRepository {
  delete: (projectId: string) => Promise<boolean>
}

export namespace DeleteUserProjectRepository {
  export type Result = boolean
}
