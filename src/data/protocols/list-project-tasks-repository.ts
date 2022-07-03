import { Task } from '@/domain/models'

export interface ListProjectTasksRepository {
  listAll: (projectId: string) => Promise<ListProjectTasksRepository.Result>
}

export namespace ListProjectTasksRepository {
  export type Result = Task[]
}
