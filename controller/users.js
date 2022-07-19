const User = require('../model/User')
const {findAllUser, userFindByProperty} = require('../services/user')

const getUserController = async (_req, res, next) => {
    try{
        const user = await findAllUser()
        if(!user) {
            return res.status(400).json({message: 'user not found'})
        }
        return res.status(200).json({message:'user found', user})
    }catch(e) {
        next(e)
    }
}

const postUserController = (req, res, next) => {
    try{



    }catch(e) {
        next(e)
    }
}

const putUserController = () => {}

const patchUserController = () => {}

const deleteUserController = () => {}

const getUserByIdController = async (req, res, next) => {
    const userId = req.params.userId
        console.log(userId)
    try{
        
        const user = await userFindByProperty('_id', userId)

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