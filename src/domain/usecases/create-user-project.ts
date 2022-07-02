export interface CreateUserProject {
  create: (projectParams: CreateUserProject.Params) => Promise<boolean>
}

export namespace CreateUserProject {
  export type Params = {
    title: string
  }
}
