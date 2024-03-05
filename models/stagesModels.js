const mongoose = require('mongoose');

const stagesSchema = new mongoose.Schema({
    stage: {
        required: true,
        type: String,
    },
    projectId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },

})

module.exports = mongoose.model('testStages', stagesSchema)