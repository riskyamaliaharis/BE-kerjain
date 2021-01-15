const router = require('Express').Router()
const { getJobseeker } = require('../controller/cHome')

router.get('/', getJobseeker)

module.exports = router
