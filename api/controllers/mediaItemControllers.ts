import { Request, Response, NextFunction } from 'express'
import MediaItem from '../models/MediaItem'

export const getAllMediaItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [items, _] = await MediaItem.findAll()

    res.status(200).json({
      items
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export const getMediaItemById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const [item, _] = await MediaItem.findById(id)

    res.status(200).json({
      item
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export const createNewMediaItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { police_id, case_id, note } = req.body
    const item: any = new MediaItem(police_id, case_id, note)
    const [result, _] = await item.save()

    res.status(201).json({ message: 'Item created', result })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
