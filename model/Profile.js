const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    profilePicture: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref:'User',

    },
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile