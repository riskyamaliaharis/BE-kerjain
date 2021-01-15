const multer = require('multer')
const helper = require('../helper/response')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/recruiter')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Extension File Must Be PNG or JPG'), false)
  }
}

const maxSize = 1024 * 2 * 1024
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize }
}).single('user_image')

const uploadFilter = (request, response, next) => {
  upload(request, response, function (err) {
    console.log(err)
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return helper.response(response, 400, err.message)
      // } else if (err.code === 'LIMIT_FILE_SIZE') {
      //   return helper.response(response, 400, 'kegedean boi')
    } else if (err) {
      // An unknown error occurred when uploading.
      return helper.response(response, 400, err.message)
    }
    // everything is fine
    next()
  })
}
module.exports = uploadFilter
