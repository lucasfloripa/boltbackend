export interface EditProjectTask {
  edit: (editParams: EditProjectTask.Params) => Promise<boolean>
}

export namespace EditProjectTask {
  export type Params = {
    description?: string
    completed?: boolean
  }
}
