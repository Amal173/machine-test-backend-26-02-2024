const asyncHandler = require('express-async-handler');
const Stages = require('../models/stagesModels');
const mongoose = require('mongoose');

const getStages = asyncHandler(async (req, res) => {
    try {
        const stage = await Stages.aggregate([{
            $match: { projectId: new mongoose.Types.ObjectId(req.params.id)}
        }]);
        if (!stage) {
            res.status(404);
            throw new Error("Stage not found");
        }

        res.status(200).json({ stage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getOneStages = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const stage = await Stages.findById(id);

        if (!stage) {
            res.status(404);
            throw new Error("Stage not found");
        }

        res.status(200).json({ stage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const updateStage = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const { stages } = req.body;
        const stage = await Stages.findByIdAndUpdate(id, { stage: stages });
        if (!stage) {
            res.status(404);
            throw new Error("Stage not found");
        }

        res.status(200).json({ stage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const createStages = asyncHandler(async (req, res) => {
    try {
        const { stages } = req.body;
        let count = 0;
        for (const element of stages) {
            await Stages.create({ projectId: req.params.id, stage: element });
            count++;
        }
        if (count <= 0) {
            res.status(404);
            throw new Error("Stage not found");
        }

        res.status(200).json({ success: "The stages were created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const DeleteStage = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const stage = await Stages.findByIdAndDelete(id);

        if (!stage) {
            res.status(404);
            throw new Error("Stage not found");
        }

        res.status(200).json({ stage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = { getStages, createStages, DeleteStage, getOneStages, updateStage };
