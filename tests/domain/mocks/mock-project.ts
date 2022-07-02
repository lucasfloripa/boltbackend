import { Project } from '@/domain/models'
import { mockTask } from '@/tests/domain/mocks'

export const mockProject = (): Project => ({
  id: 'any-id',
  title: 'any_project_title',
  tasks: [mockTask()]
})
