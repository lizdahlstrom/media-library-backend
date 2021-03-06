import { Request, Response, NextFunction } from 'express'
import MediaItem from '../models/MediaItem'

// create
export const createNewMediaItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { police_id, case_id, note, ID } = req.body
    const item: any = new MediaItem(police_id, case_id, note, ID)
    const [result] = await item.save()

    res.status(201).json({ message: 'Item created', result })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

// read
export const getAllMediaItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [items] = await MediaItem.findAll()

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
    const [item] = await MediaItem.findById(id)

    res.status(200).json({
      item
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

// update
export const updateMediaItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    await MediaItem.updateItem(id, req.body)

    res.status(200).json({
      message: 'Item updated'
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

// delete
export const deleteMediaItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const [result] = await MediaItem.deleteItem(id)

    if ((result as any).affectedRows < 1) {
      res.status(404).json({
        message: 'Item does not exist'
      })
      return
    }

    res.status(200).json({
      message: 'Item deleted',
      result: result
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
