const User = require("../model/User")

const userFindByProperty = (key, value) => {
    if(key === '_id') {
        return User.findById(value)
    }
    return User.findOne({[key]: value})
}

const createNewUser = async ({name, email, password, roles, accountsStatus}) => {
    user = new User({name, email, password, roles:roles ? roles: ['student'], accountsStatus: accountsStatus ? accountsStatus:"PENDING" })
    return await user.save()
}

const findAllUser = () => {
    return User.find()
}

const patUpdateUser = (id, data) => {

    const user = userFindByProperty('email', data.email)

    if(!user) {
        const error = new Error("user not found")
        error.status = 404
        throw(error)
    }

    return User.findByIdAndUpdate(id, {...data}, {new:true})
}

module.exports = {
    userFindByProperty,
    createNewUser,
    findAllUser,
    patUpdateUser,
}
