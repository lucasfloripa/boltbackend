import { Task } from './task'

export type Project = {
  id: string
  title: string
  tasks?: Task[]
}
