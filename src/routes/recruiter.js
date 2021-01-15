const router = require('express').Router()
const uploadImage = require('../middleware/multer_recruiters')
// const { authRecruiter } = require('../middleware/auth')
const {
  dataRecruiter,
  registerRecruiter,
  loginRecruiter,
  settingRecruiter
} = require('../controller/c_recruiter')

// => Recruiter
router.get('/', dataRecruiter)
router.post('/register', registerRecruiter)
router.post('/login', loginRecruiter)
router.patch('/:id', uploadImage, settingRecruiter)
module.exports = router
