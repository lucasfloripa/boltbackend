export interface EditProjectTaskRepository {
  edit: (data: EditProjectTaskRepository.Params) => Promise<boolean>
}

export namespace EditProjectTaskRepository {
  export type Params = {
    taskId: string
    description?: string
    completed?: boolean
  }
  export type Result = boolean
}
