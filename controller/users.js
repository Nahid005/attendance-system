const User = require('../model/User')
const userService = require('../services/user')
const authService = require('../services/auth')

const getUserController = async (_req, res, next) => {
    try{
        const user = await userService.findAllUser()
        if(!user) {
            return res.status(400).json({message: 'user not found'})
        }
        return res.status(200).json({message:'user found', user})
    }catch(e) {
        next(e)
    }
}

const postUserController = async (req, res, next) => {

    const {name, email, password, roles, accountsStatus} = req.body

    if(!name ?? !email ?? password ?? roles ?? accountsStatus){
        res.status(400).json({message: "invalide data "})
    }

    try{

        const user = await authService.registrationService({name, email, password, roles, accountsStatus})
        return res.status(201).json({message: 'create new user', user})

    }catch(e) {
        next(e)
    }
}

const putUserController = async (req, res, next) => {
    const userId = req.params.userId
    const { name, email, roles, accountsStatus } = req.body

    try{

        const user = await userService.patUpdateUser(userId, {name, email, roles, accountsStatus})

        if(!user){
            res.status(404).json({message: 'user not found'})
        }

        return res.status(200).json(user)

    }catch(e){
        next(e)
    }
}

const patchUserController = async (req, res, next) => {
    const userId = req.params.userId
    const { name, roles, accountsStatus } = req.body

    try{
        const user = await userService.userFindByProperty('_id', userId)

        user.name = name ?? user.name,
        user.roles = roles ?? user.roles,
        user.accountsStatus = accountsStatus ?? user
        
        user.save()

        return res.status(200).json(user)

    } catch(e){
        next(e)
    }
}

const deleteUserController = async (req, res, next) => {

    const userId = req.params.userId

    try{
        const user = await userService.userFindByProperty('_id', userId)
        console.log(user)
        if(!user) {
            res.status(200).json({message: 'user not found'})
        }

        user.remove()
        res.status(200).json({message: 'delete user'})

    }catch(e) {
        next(e)
    }
}

const getUserByIdController = async (req, res, next) => {

    const userId = req.params.userId

    try{
        const user = await userService.userFindByProperty('_id', userId )

        if(!user) {
            res.status(400).json({message: 'user not found'})
        }

        res.status(200).json({message: 'user found ', user})
    }catch(e) {
        next(e)
    }

}

module.exports = {
    getUserByIdController,
    postUserController,
    putUserController,
    patchUserController,
    deleteUserController,
    getUserController
}