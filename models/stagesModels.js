const mongoose = require('mongoose');

const stagesSchema = new mongoose.Schema({
    stage: {
        required: true,
        type: String,
        // default: ["todo","in-progress","done"]
    },
    // userId: {
    //     required: true,
    //     type: String
    // },

})

module.exports = mongoose.model('testStages', stagesSchema)