import express, { Router } from 'express'

import {
  createSuspect,
  getAllSuspects,
  getSuspectById,
  updateSuspect,
  deleteSuspect
} from '../controllers/suspectController'

const router: Router = express.Router()

router
  .route('/')
  .get(getAllSuspects)
  .post(createSuspect)

router
  .route('/:id')
  .get(getSuspectById)
  .put(updateSuspect)
  .delete(deleteSuspect)

export default router
