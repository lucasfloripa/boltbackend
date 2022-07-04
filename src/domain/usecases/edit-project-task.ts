export interface EditProjectTask {
  edit: (editParams: EditProjectTask.Params) => Promise<boolean>
}

export namespace EditProjectTask {
  export type Params = {
    taskId: string
    description?: string
    completed?: boolean
  }
}
