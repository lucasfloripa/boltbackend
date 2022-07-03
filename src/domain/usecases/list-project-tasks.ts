import { Task } from '@/domain/models'

export interface ListProjectTasks {
  list: (projectId: string) => Promise<ListProjectTasks.Result>
}

export namespace ListProjectTasks {
  export type Result = Task[]
}
