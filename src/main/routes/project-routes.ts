import { adaptRoute } from '@/main/adapters'
import { makeCreateUserProjectController, makeDeleteUserProjectController, makeEditUserProjectController, makeListProjectsByUserController } from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/project', adaptRoute(makeCreateUserProjectController()))
  router.delete('/project', adaptRoute(makeDeleteUserProjectController()))
  router.put('/project', adaptRoute(makeEditUserProjectController()))
  router.get('/project/:userId', adaptRoute(makeListProjectsByUserController()))
}
