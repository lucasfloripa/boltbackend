export interface DeleteProjectTaskRepository {
  delete: (taskId: string) => Promise<boolean>
}

export namespace DeleteProjectTaskRepository {
  export type Result = boolean
}
