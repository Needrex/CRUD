import multer from "multer"
import path from "path"

export const diskStorage = multer.diskStorage({ //multers disk storage settings
   destination: function (req, file, cb) {
      cb(null, './public/uploads')
   },

   filename: function (req, file, cb) {
      const datetimestamp = Date.now();
      cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
   },

});

export function fileFilter(req, file, callback) {
   console.log(path.extname(file.originalname));
   const ext = path.extname(file.originalname);
   if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Hanya boleh file gambar saja'), false)
   }
   callback(null, true)
}