import { Project } from '@/domain/models'

export interface ListProjectsByUserRepository {
  listAll: (userId: string) => Promise<ListProjectsByUserRepository.Result>
}

export namespace ListProjectsByUserRepository {
  export type Result = Project[]
}
