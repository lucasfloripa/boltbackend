import { Project } from '@/domain/models'

export interface ListProjectsByUser {
  list: (userId: string) => Promise<ListProjectsByUser.Result>
}

export namespace ListProjectsByUser {
  export type Result = Project[]
}
