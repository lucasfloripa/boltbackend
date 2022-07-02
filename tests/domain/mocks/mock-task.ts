import { Task } from '@/domain/models'

export const mockTask = (): Task => ({
  description: 'task_description',
  creationDate: new Date(1995, 11, 17),
  finishDate: new Date(1995, 11, 18),
  completed: true
})
