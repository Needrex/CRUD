import mongoose, { version } from "mongoose"

const oneSchema = new mongoose.Schema({
   nama: {
      type: String,
      required: true
   },
   kelas: {
      type: String,
      required: true
   },
   jurusan: {
      type: String,
      required: true
   },
   image: {
      type: String,
      required: true
   },
   date: { type: Date, default: Date.now },
}, { versionKey: false })

const oneModel = mongoose.model('biodata', oneSchema)
export { oneModel }

