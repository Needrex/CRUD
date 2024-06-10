import { oneModel } from "../model/oneModel.js"
import { respons } from "../middleware/respons.js"
import { schemaValidation } from "../validations/joiValidation.js"
import { logger } from "../logs/settingsLOG.js"
import fs from "fs"

const oneTampil = async (req, res, next) => {

   logger.info('SERVER MENGAKSES ALL TAMPIL')
   const allData = await oneModel.find()
   if (allData.length < 1) {
      const err = new Error("data gagal di tampilkan")
      err.statusCode = 500
      err.erorDetail = allData
      logger.error("data gagal di tampilkan")
      next(err)
   } else {
      respons(200, "data berhasil di tampilkan", allData, res)
      logger.info("data berhasil di tampilkan")
   }
}

const oneTampilbyID = async (req, res, next) => {

   logger.info('SERVER MENGAKSES ONE TAMPIL BY ID')
   const id = req.params.id

   if (id === undefined) {
      const err = new Error("id anda belum di masukan")
      err.statusCode = 400
      logger.warn("id anda belum di masukan")
      next(err)
   }

   const resultData = await oneModel.findById(id)

   if (resultData === null) {
      const err = new Error("data gagal di tampilkan")
      err.statusCode = 500
      err.erorDetail = resultData
      logger.error("data gagal di tampilkan")
      next(err)
   } else {
      respons(200, "data berhasil di tampilkan", resultData, res)
      logger.info("data berhasil di tampilkan")
   }
}

const oneInput = async (req, res, next) => {

   logger.info('SERVER MENGAKSES ONE INPUT')
   try {
      console.log(req.body);
      const dataMentah = req.body
      const validation = await schemaValidation.validateAsync(dataMentah)

      if (!req.file) {
         const err = new Error("File gambar tidak di temukan")
         err.statusCode = 400
         next(err)
      }

      const data = new oneModel({
         nama: dataMentah.nama,
         kelas: dataMentah.kelas,
         jurusan: dataMentah.jurusan,
         image: `/uploads/${req.file.filename}`
      })
      const resultData = await data.save()

      respons(200, "data berhasil di simpan", resultData, res, "")
      logger.info("data berhasil di simpan")

   } catch (error) {
      const err = new Error(error.details[0].message || error)
      err.statusCode = 400
      logger.error(error.details[0].message || error)
      next(err)
   }
}

const oneDelete = async (req, res, next) => {

   const id = req.params.id

   if (id === undefined) {
      const err = new Error("id anda belum di masukan")
      err.statusCode = 400
      logger.warn("id anda belum di masukan")
      next(err)
   }

   const resultData = await oneModel.findByIdAndDelete(id)

   if (resultData === null) {
      const err = new Error("data gagal di hapus")
      err.statusCode = 500
      err.erorDetail = resultData
      logger.error("data gagal di hapus")
      next(err)
   } else {
      respons(200, "data berhasil di hapus", resultData, res)
      logger.info("data berhasil di hapus")
   }
}

const oneUpdate = async (req, res, next) => {
   try {

      const id = req.params.id

      if (id === undefined) {
         const err = new Error("id anda belum di masukan")
         err.statusCode = 400
         logger.warn("id anda belum di masukan")
         next(err)
      }

      if (!req.file) {
         const err = new Error("File gambar tidak di temukan")
         err.statusCode = 400
         next(err)
      }

      const data = req.body
      const validation = await schemaValidation.validateAsync(data)
      const resultData = await oneModel.findByIdAndUpdate(id, {
         $set: {
            nama: req.body.nama,
            kelas: req.body.kelas,
            jurusan: req.body.jurusan,
            image: `/uploads/${req.file.filename}`
         }
      })

      if (resultData === null) {
         const err = new Error("data gagal di update")
         err.statusCode = 500
         err.erorDetail = resultData
         logger.error("data gagal di update")
         next(err)
      } else {
         // fs.unlink('C:/Users/Acer/OneDrive/Dokumen/JS/nodeJS/public' + resultData.image, (err) => {
         //    if (err) throw err
         // })
         respons(200, "data berhasil di update", resultData, res)
         logger.info("data berhasil di update")
      }

   } catch (error) {
      console.log(error);
      const err = new Error(error)
      err.statusCode = 400
      next(err)
      logger.error(error)
   }
}


export { oneTampil, oneTampilbyID, oneInput, oneDelete, oneUpdate }