import { Router } from 'express'
import { Controller } from '../controllers/controller.js'
import { LocationRecordModel } from '../models/locationRecordModel.js'

export function createRouter (locationRecordModel: LocationRecordModel) {
  const router = Router()
  const controller = new Controller(locationRecordModel)
  router.get('/generateAndSendCsv', controller.generateAndSendCsv.bind(controller))
  return router
}
