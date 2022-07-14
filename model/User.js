const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    password: {
        type: String,
        minlength: 8
    },
    roles: {
        type: [String],
        default: ['student']
    },
    accountsStatus: {
        type: String,
        enum: ["PENDING", "ACTIVE", "REJECT"],
        default:"PENDING"
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User