const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    email: {
        required: true,
        unique:true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    phonenumber: {
        required: true,
        type: String
    },
    role: {
        default:"user",
        type: String,

    },

})

module.exports = mongoose.model('user', userSchema)