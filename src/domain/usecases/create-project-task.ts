export interface CreateProjectTask {
  create: (taskParams: CreateProjectTask.Params) => Promise<boolean>
}

export namespace CreateProjectTask {
  export type Params = {
    projectId: string
    description: string
  }
}
