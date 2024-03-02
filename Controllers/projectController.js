const asyncHandler = require('express-async-handler');
const Project = require('../models/projectModels');
const stage = require("./../models/stagesModels");
const users = require('../models/userModels');

const getProject = asyncHandler(async (req, res) => {
    try {
        let project;
        const user = await users.findById(req.params.id);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        
        if (user.role === "Admin") {
            project = await Project.find();
        } else {
            project = await Project.aggregate([{
                $match: { userId: req.params.id }
            }]);
        }

        if (!project) {
            res.status(404);
            throw new Error("Project not found");
        }

        res.status(200).json({ project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getOneProject = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const project = await Project.findById(id);

        if (!project) {
            res.status(404);
            throw new Error("Project not found");
        }

        res.status(200).json({ project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const updateProject = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const project = await Project.findByIdAndUpdate(id, req.body);
        
        if (!project) {
            res.status(404);
            throw new Error("Project not found");
        }

        res.status(200).json({ project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const createProject = asyncHandler(async (req, res) => {
    try {
        const project = await Project.create(req.body);

        if (!project) {
            res.status(404);
            throw new Error("Project not found");
        }

        const stages = ["todo", "in-progress", "done"];
        for (const Stage of stages) {
            await stage.create({ projectId: project._id, stage: Stage });
        }

        res.status(200).json({ project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const DeleteProject = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            res.status(404);
            throw new Error("Project not found");
        }

        res.status(200).json({ project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = { getProject, getOneProject, updateProject, createProject, DeleteProject };
