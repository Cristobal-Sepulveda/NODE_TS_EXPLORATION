import express from 'express'
import dotenv from 'dotenv'
import { LocationRecordModel } from './src/models/locationRecord.js'
import { createRouter } from './src/routes/routes.js'

dotenv.config({ path: '.env' })

const app = express()
const PORT = process.env.PORT || 8000
app
  .disable('x-powered-by')
  .use(express.json())
  .use('/', createRouter({ model: LocationRecordModel }))
  .listen(PORT, () => { console.log(`Servidor escuchando en el puerto ${PORT}`) })
