import express from 'express'
import dotenv from 'dotenv'
import { LocationRecordModel } from './src/models/locationRecordModel.js'
import { createRouter } from './src/routes/routes.js'
dotenv.config({ path: '.env' })

const app = express()
const PORT = process.env.PORT ?? 8000

const locationRecordModel = new LocationRecordModel()

app
  .disable('x-powered-by')
  .use(express.json())
  .use('/', createRouter(locationRecordModel))
  .listen(PORT, () => { console.log(`Servidor escuchando en el puerto ${PORT}`) })
