const router = require('Express').Router()
// ==> User router
const user = require('./routes/user')
router.use('/user', user)

module.exports = router
