const mongoose = require('mongoose');

const stagesSchema = new mongoose.Schema({
    stage: {
        required: true,
        type: String,
    },
    projectId: {
        required: true,
        type: String
    },

})

module.exports = mongoose.model('testStages', stagesSchema)