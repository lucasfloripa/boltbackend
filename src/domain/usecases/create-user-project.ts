export interface CreateUserProject {
  create: (projectParams: CreateUserProject.Params) => Promise<boolean>
}

export namespace CreateUserProject {
  export type Params = {
    userId: string
    title: string
  }
}
