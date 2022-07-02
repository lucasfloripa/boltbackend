export interface DeleteUserProject {
  delete: (projectId: DeleteUserProject.Params) => Promise<boolean>
}

export namespace DeleteUserProject {
  export type Params = {
    projectId: string
  }
}
