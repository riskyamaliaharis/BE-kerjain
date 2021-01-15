const router = require('Express').Router()
// ==> Workers <==
const workers = require('./routes/workers')
router.use('/workers', workers)

// ==> Recruiter <==
const recruiter = require('./routes/recruiter')
router.use('/recruiter', recruiter)

const home = require('./routes/rHome')

router.use('/home', home)

module.exports = router
