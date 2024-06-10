import express from "express"
const router = express.Router()

import { oneModel } from "../model/oneModel.js"
import { logger } from "../logs/settingsLOG.js"

import {
   oneTampil,
   oneTampilbyID,
   oneInput,
   oneDelete,
   oneUpdate
} from "../controllers/oneController.js"

router.param('id', async (req, res, next, value) => {
   try {
      const cariData = await oneModel.findById(value)
      next()
   } catch (error) {
      const err = new Error("id yang anda masukan salah")
      err.statusCode = 400
      logger.error("id yang anda masukan salah")
      next(err)
   }
})


router.route('/')
   .get(oneTampil)
   .post(oneInput)

router.route('/:id')
   .get(oneTampilbyID)
   .delete(oneDelete)
   .put(oneUpdate)

export { router }

