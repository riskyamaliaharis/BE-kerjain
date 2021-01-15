const router = require('Express').Router()
// ==> Pekerja
const workers = require('./routes/workers')
router.use('/workers', workers)

// ==> Perekrut
const recruiter = require('./routes/recruiter')
router.use('/recruiter', recruiter)

const home = require('./routes/rHome')

router.use('/home', home)

module.exports = router
