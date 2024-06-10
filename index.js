import express, { response } from "express"
import cors from "cors"
import { router } from "./routes/oneRoute.js"
import { } from "./model/koneksi.js"
import { config } from "dotenv"
import { logger } from "./logs/settingsLOG.js"
import multer from "multer"
import { diskStorage, fileFilter } from "./validations/multerValidation.js"
import { errorHandler } from "./middleware/errorHandler.js"
import path from "path"
import fs from "fs"

config()
const app = express()
app.use(express.json())
app.use(cors())
// app.use(express.urlencoded({ extended: false }))
app.use(express.static('./public'))
app.use(multer({
   storage: diskStorage, fileFilter: fileFilter, limits: {
      fileSize: 1024 * 1024
   }
}).single('image'))
app.use('/Needrex/V1', router)
app.all('*', (req, res, next) => {
   logger.warn('url tidak bisa di akses')
   const err = new Error('url tidak bisa di akses')
   err.statusCode = 400
   next(err)
})
app.use(errorHandler)



const PORT = process.env.PORT
app.listen(PORT, () => {
   console.log('SERVER RUN IN http://localhost:3000/')
   logger.info('SERVER RUN IN http://localhost:3000/')
})
