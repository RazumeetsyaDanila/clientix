const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const adminRouter = require('./adminRouter')

router.use('/user', userRouter)
router.use('/admin', adminRouter)

module.exports = router