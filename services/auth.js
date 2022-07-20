const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {userFindByProperty, createNewUser} = require('./user')

const registrationService = async ({name, email, password, roles, accountsStatus})=> {

    let user = await userFindByProperty('email', email)
    if(user){
        const error = new Error('user already exist')
        error.status = 400
        throw(error)
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return createNewUser({name, email, password:hash, roles, accountsStatus})

}

const loginService = async ({email, password})=> {
    const user = await userFindByProperty('email', email)
    if(!user) {
        const error = new Error('envalide email')
        error.status = 400
        throw(error)
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if(!passwordMatch) {
        const error = new Error('envalide password')
        error.status = 400
        throw(error)
    }

    delete user._doc.password
    return tokenGenarate = jwt.sign(user._doc, 'secret-key')
    
}

module.exports = {
    registrationService,
    loginService
}