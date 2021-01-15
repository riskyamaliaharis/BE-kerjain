const router = require('express').Router()
// const { authPekerja } = require('../middleware/auth')
const {
  registerWorkers,
  loginUser,
  DataWorkers,
  dataById,
  settingWorkers
} = require('../controller/c_workers')

// +Pekerja+
router.get('/', DataWorkers)
router.get('/:id', dataById)
router.post('/register', registerWorkers)
router.post('/login', loginUser)
router.patch('/:id', settingWorkers)
module.exports = router
