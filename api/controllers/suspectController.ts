import { Request, Response, NextFunction } from 'express'
import Suspect from '../models/Suspect'

// create
export const createSuspect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { first_name, last_name } = req.body
    const suspect: any = new Suspect(first_name, last_name)
    const [result] = await suspect.save()

    res.status(201).json({ message: 'Suspect created', result })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export const getAllSuspects = async (req: Request, res:Response, next:NextFunction) => {
  try {
    const [items] = await Suspect.findAll()

    res.status(200).json({
      items
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
export const getSuspectById = async (req: Request, res:Response, next:NextFunction) => {
  try {
    const { id } = req.params
    const [item] = await Suspect.findById(id)

    res.status(200).json({
      item
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
export const updateSuspect = async (req: Request, res:Response, next:NextFunction) => {
  try {
    const { id } = req.params
    await Suspect.update(id, req.body)

    res.status(200).json({
      message: `Suspect with id ${id} updated`
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
export const deleteSuspect = async (req: Request, res:Response, next:NextFunction) => {
  try {
    const { id } = req.params
    await Suspect.delete(id)

    res.status(200).json({
      message: `Suspect with id ${id} deleted`
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
