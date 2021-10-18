const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    image: {
        type: String
    },
    resetToken: {
        type: String,
        default: ''
    },
    expireToken: {
        type: Date
    }
}, {timestamps: true})

const Users = mongoose.model('users', userSchema);

module.exports = Users;