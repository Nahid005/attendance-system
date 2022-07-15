const jwt = require('jsonwebtoken')
const User = require('../model/User')

const authentication = async (req, res, next)=> {

    try{
        let token = await req.headers.authorization
        if(!token) {
            res.status(401).json({message: 'invalid token'})
        }
        token = token.split(' ')[1]

        const tokenVerify = await jwt.verify(token, 'secret-key')
        const user = await User.findById(tokenVerify._id)

        if(!user){
            res.status(401).json({message: 'invalid token'})
        }

        req.user = user
        next()

    }catch(e) {
        res.status(400).json({message: "this is a invalid token"})
    }
}

module.exports = authentication