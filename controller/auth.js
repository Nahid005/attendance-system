const {registrationService, loginService} = require('../services/auth')


const registerController = async (req, res, next) => {
    const {name, email, password} = req.body

    if(!name || !email || !password) {
        const error = new Error("invalid data")
        error.status = 400
        throw(error)
    }

    try{
        const user = await registrationService({name, email, password})
        console.log(user)
        return res.status(201).json({message: 'create new user', user})
    }catch(e) {
        next(e)
    }
}

const loginController = async (req, res, next) => {

    const {email, password} = req.body

    try{
        const token = await loginService({email, password})
        res.status(200).json({message: 'login successfully ', tokenGenarate})
    }catch(e) {
        next(e)
    }

}

module.exports = {
    registerController,
    loginController
}