const User = require("../model/User")

const userFindByProperty = (key, value) => {
    if(key === '_id') {
        return findById(value)
    }
    return User.findOne({[key]: value})
}

const createNewUser = async ({name, email, password}) => {
    user = new User({name, email, password})
    return await user.save()
}

module.exports = {
    userFindByProperty,
    createNewUser
}
