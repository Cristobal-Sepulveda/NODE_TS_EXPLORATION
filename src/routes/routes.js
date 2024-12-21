import { Router } from 'express'
import { Controller } from '../controllers/controller.js'

export function createRouter ({ model }) {
  const generateAndSendCsvRouter = Router()
  const controller = new Controller({ locationRecordModel: model })

  generateAndSendCsvRouter.get('/generateAndSendCsv', controller.generateAndSendCsv)
  return generateAndSendCsvRouter
}
