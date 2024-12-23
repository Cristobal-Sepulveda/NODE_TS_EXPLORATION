import { Router } from 'express'
import { Controller } from '../controllers/controller.js'
import { LocationRecordModel } from '../models/locationRecordModel.js'
import asyncHandler from 'express-async-handler'

export function createRouter (
  locationRecordModel: LocationRecordModel
): Router {
  const router = Router()
  const controller = new Controller(locationRecordModel)
  router.get(
    '/generateAndSendCsv',
    asyncHandler(controller.generateAndSendCsv.bind(controller))
  )
  return router
}
