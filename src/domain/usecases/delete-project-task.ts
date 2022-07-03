export interface DeleteProjectTask {
  delete: (taskId: DeleteProjectTask.Params) => Promise<boolean>
}

export namespace DeleteProjectTask {
  export type Params = {
    taskId: string
  }
}
