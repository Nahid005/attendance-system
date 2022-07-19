const router = require('express').Router();
const authRouter = require('./auth')
const userRouter = require('./users')
const userAuthencation = require('../middleware/authentication')

router.use('/api/v1/auth', authRouter)
router.use('/api/v1/users', userAuthencation, userRouter)


module.exports = router