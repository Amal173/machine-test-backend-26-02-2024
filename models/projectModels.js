const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    type: {
        required: true,
        type: String
    },
    createdOn: {
        default:Date(),
        required: true,
        type: String
    }
})

module.exports = mongoose.model('project', projectSchema)