import express, { Router } from 'express'
import {
  getAllMediaItems,
  getMediaItemById,
  createNewMediaItem
} from '../controllers/mediaItemControllers'

const router: Router = express.Router()

router.route('/').get(getAllMediaItems).post(createNewMediaItem)

router.route('/:id').get(getMediaItemById)

export default router
