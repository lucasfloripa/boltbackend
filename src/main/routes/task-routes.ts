import { adaptRoute } from '@/main/adapters'
import { makeCreateProjectTaskController, makeDeleteProjectTaskController, makeEditProjectTaskController, makeListProjectTasksController } from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/task', adaptRoute(makeCreateProjectTaskController()))
  router.delete('/task', adaptRoute(makeDeleteProjectTaskController()))
  router.put('/task', adaptRoute(makeEditProjectTaskController()))
  router.get('/task/:projectId', adaptRoute(makeListProjectTasksController()))
}
