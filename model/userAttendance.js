const mongoose = require('mongoose')

const userAttendanceSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    adminAttendance: {
        type: Schema.Types.ObjectId,
        ref: 'adminAttendance'
    },
    createAt: Date,
})

const userAttendance = mongoose.model('userAttendance', userAttendanceSchema)

module.exports = userAttendance