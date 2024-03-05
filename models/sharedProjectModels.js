const mongoose = require('mongoose');

const SharedprojectSchema = new mongoose.Schema({
    projectId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    sharedFrom: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    sharedTo: {
        required: true,
        type: [ mongoose.Schema.Types.ObjectId]
    },
    sharedOn: {
        default:Date(),
        required: true,
        type: String
    }
})

module.exports = mongoose.model('shared-project', SharedprojectSchema)