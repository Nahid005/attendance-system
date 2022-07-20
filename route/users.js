const router = require('express').Router()

const userService = require('../controller/users')
router.get('/:userId', userService.getUserByIdController)                      
router.put('/:userId', userService.putUserController)
router.patch('/:userId', userService.patchUserController)
router.delete('/:userId', userService.deleteUserController)
router.get('/', userService.getUserController)
router.post('/', userService.postUserController)

module.exports = router