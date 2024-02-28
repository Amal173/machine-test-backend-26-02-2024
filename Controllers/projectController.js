const asyncHandler = require('express-async-handler')
const Project = require('../models/projectModels')
const stage=require("./../models/stagesModels")

const getProject = asyncHandler(async (req, res) => {

    const project = await Project.find()

    if (!project) {
        res.status(404);
        throw new Error("project not found");
    }

    res.status(200).json({ project })
});

const getOneProject = asyncHandler(async (req, res) => {
    const id = req.params.id
    const project = await Project.findById(id)

    if (!project) {
        res.status(404);
        throw new Error("project not found");
    }

    res.status(200).json({ project })
});

const updateProject = asyncHandler(async (req, res) => {
    const id = req.params.id
    const project = await Project.findByIdAndUpdate(id, req.body)
    if (!project) {
        res.status(404);
        throw new Error("project not found");
    }

    res.status(200).json({ project })
});


const createProject = asyncHandler(async (req, res) => {
    const project = await Project.create(req.body)
    if (!project) {
        res.status(404);
        throw new Error("project not found");
    }
    const stages=["todo","in-progress","done"]
    for(const Stage of stages){
        await stage.create({projectId:project._id,stage:Stage})

    }
    res.status(200).json({ project })
});


const DeleteProject = asyncHandler(async (req, res) => {
    const id = req.params.id
    const project = await Project.findByIdAndDelete(id)

    if (!project) {
        res.status(404);
        throw new Error("project not found");
    }

    res.status(200).json({ project })
});

module.exports = { getProject, getOneProject, updateProject, createProject, DeleteProject }