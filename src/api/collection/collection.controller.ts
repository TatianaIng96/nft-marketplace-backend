import { Request, Response } from "express";

import {
  getAllCollections,
  getCollectionById,
  updateCollection,
  createCollection,
  deleteCollection
} from "./collection.service";

export const getAllCollectionsHandler = async (_: Request, res: Response) => {
  try {
    const collections = await getAllCollections()
    res.status(200).json({ message: "Collections successfully found", collections })
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

export const getCollectionByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const singleCollection = await getCollectionById(parseInt(id))

    res.status(200).json({ message: "Collection successfully found", singleCollection })
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

export const updateCollectionHandler = async (req: Request, res: Response) => {
  const { id } = req.params
  const { body } = req

  try {
    const updateSingleCollection = await updateCollection(parseInt(id), body)

    res.status(202).json({ message: "Collection succesfully updated", updateSingleCollection })
  } catch (error) {
    res.status(403).json({ message: error })
  }
}

export const createCollectionHandler = async (req: Request, res: Response) => {
  const { body } = req
  try {
    const newCollection = await createCollection(body)

    res.status(201).json({ message: "Collection succesfully created", newCollection })
  } catch (error) {
    res.status(403).json({ message: error })
  }
}
export const deleteCollectionHandler = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const deleteSingleCollection = await deleteCollection(parseInt(id))

    res.status(202).json({ message: "Collection succesfully deleted", deleteSingleCollection })
  } catch (error) {
    res.status(403).json({ message: error })
  }
}