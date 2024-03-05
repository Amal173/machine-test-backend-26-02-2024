const asyncHandler = require('express-async-handler');
const sharedProject = require('../models/sharedProjectModels');
const mongoose = require('mongoose');
const Project = require('../models/projectModels');


const getSharedProjects = asyncHandler(async (req, res) => {
    try {
        const fetchedProjects = await sharedProject.aggregate([

            {
                $match: {
                    sharedTo:new mongoose.Types.ObjectId(req.params.id )
                }
            },
            {
                $project: {
                    projectId: 1 
                }
            }
        ]);
        
        if (!fetchedProjects) {
            res.status(404);
            throw new Error("Project not found");
        }
        const projectIds = fetchedProjects.map(project => project.projectId);
        
        const project = await Project.aggregate([
            {
                $match: {
                    _id: { $in: projectIds }
                }
            }
        ]);

        res.status(200).json({ project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getSharedProject = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const project = await sharedProject.findById(id);

        if (!project) {
            res.status(404);
            throw new Error("Project not found");
        }

        res.status(200).json({ project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const updateSharedProject = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const project = await sharedProject.findByIdAndUpdate(id, req.body);

        if (!project) {
            res.status(404);
            throw new Error("Project not found");
        }

        res.status(200).json({ project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const createSharedProject = asyncHandler(async (req, res) => {
    try {
        const { sharedFrom, sharedTo, projectId } = req.body
        let From = [];

        From = sharedTo.map(a => a._id);

        const project = await sharedProject.create({ sharedFrom, projectId, sharedTo: From });

        if (!project) {
            res.status(404);
            throw new Error("Project not found");
        }

        res.status(200).json({ project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const DeleteSharedProject = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const project = await sharedProject.findByIdAndDelete(id);

        if (!project) {
            res.status(404);
            throw new Error("Project not found");
        }

        res.status(200).json({ project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = { getSharedProjects, getSharedProject, updateSharedProject, createSharedProject, DeleteSharedProject };
