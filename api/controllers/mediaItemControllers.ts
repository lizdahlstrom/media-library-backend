import { Request, Response, Errback } from 'express'

export const getAllMediaItems = async (req: Request, res: Response, next: Errback) => {
  res.send('Media items')
}

export const getMediaItemById = async (req: Request, res: Response, next: Errback) => {
  res.send('Media by id')
}

export const createNewMediaItem = async (req: Request, res: Response, next: Errback) => {
  res.send('Create media item')
}
