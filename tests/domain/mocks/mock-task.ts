import { Task } from '@/domain/models'

export const mockTask = (): Task => ({
  description: 'task_description',
  creationDate: new Date('20/08/1990'),
  finishDate: new Date('21/08/1990'),
  completed: true
})
