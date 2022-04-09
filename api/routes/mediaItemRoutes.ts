import express, { Router } from 'express'

import {
  getAllMediaItems,
  createNewMediaItem,
  getMediaItemById,
  updateMediaItem,
  deleteMediaItem
} from '../controllers/mediaItemControllers'

const router: Router = express.Router()

router
  .route('/')
  .get(getAllMediaItems)
  .post(createNewMediaItem)

router
  .route('/:id')
  .get(getMediaItemById)
  .put(updateMediaItem)
  .delete(deleteMediaItem)

export default router
