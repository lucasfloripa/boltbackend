import { Task } from '@/domain/models'

export interface LoadTaskByIdRepository {
  loadById: (taskId: string) => Promise<LoadTaskByIdRepository.Result>
}

export namespace LoadTaskByIdRepository {
  export type Result = Task
}
