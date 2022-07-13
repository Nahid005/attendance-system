const mongoose = require('mongoose')

const adminAttendanceSchema = new mongoose.Schema({
    createAt: Date,
    Status: String,
    timeLimit: Number,
})

const adminAttendance = mongoose.model('adminAttendance', adminAttendanceSchema)

module.exports = adminAttendance