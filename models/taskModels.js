const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    discription: {
        required: true,
        type: String
    },
    dueDate: {
        required: true,
        type: String
    },
    status: {
        required: true,
        type: String
    },
    projectId: {
        required: true,
        type: String
    },
    createdOn: {
        default:Date(),
        required: true,
        type: String
    }
})

module.exports = mongoose.model('testTask', taskSchema)