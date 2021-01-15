const router = require('express').Router()
// const { authPekerja, authPerekrut } = require('../middleware/auth')
const {
  dataRecruiter,
  registerRecruiter,
  loginRecruiter
  //   patchRecruiter
} = require('../controller/c_recruiter')

// +Perekrut+
router.get('/', dataRecruiter)
router.post('/register', registerRecruiter)
router.post('/login', loginRecruiter)
// router.patch('/:id', patchRecruiter)
module.exports = router
