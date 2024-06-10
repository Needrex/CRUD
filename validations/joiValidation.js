import Joi from "joi"

export const schemaValidation = Joi.object({
   nama: Joi.string().min(3).max(30).required(),
   kelas: Joi.string().required().valid("XI RPL 1", "XI RPL 2"),
   jurusan: Joi.string().required(),
   // image: Joi.string().required()
})

