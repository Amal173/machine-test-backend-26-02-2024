const asyncHandler = require('express-async-handler')

const Stages = require('../models/stagesModels')


const getStages = asyncHandler(async (req, res) => {

    const stage = await Stages.find()

    if (!stage) {
        res.status(404);
        throw new Error("stage not found");
    }

    res.status(200).json({ stage })
});


const createStages = asyncHandler(async (req, res) => {

    const { stages } = req.body
    let count = 0
    for (const element of stages) {
        console.log(element);
        await Stages.create({ stage: element })
        count++
    }
    if (count<=0) {
        res.status(404);
        throw new Error("stage not found");
    }

    res.status(200).json({ succes:"the stages created succesfully" })
});


const DeleteStage = asyncHandler(async (req, res) => {
    const id = req.params.id
    const stage = await Stages.findByIdAndDelete(id)

    if (!stage) {
        res.status(404);
        throw new Error("stage not found");
    }

    res.status(200).json({ stage })
});

module.exports = { getStages, createStages, DeleteStage }