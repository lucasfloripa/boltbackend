import { Project } from './project'

export type User = {
  id: string
  email: string
  password: string
  projects?: Project[]
}
