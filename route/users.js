const router = require('express').Router()

const userService = require('../controller/users')
router.get('/:userId', userService.getUserByIdController)                      
router.post('/users:userId', () => {})
router.put('/users:userId', () => {})
router.patch('/users:userId', () => {})
router.delete('/users:userId', () => {})
router.get('/', userService.getUserController)

module.exports = router