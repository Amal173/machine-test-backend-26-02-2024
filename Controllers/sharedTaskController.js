const asyncHandler = require('express-async-handler');
const sharedTasks = require('../models/sharedTaskModels');
const mongoose = require('mongoose');
const task = require("../models/taskModels");


const getSharedTasks = asyncHandler(async (req, res) => {
    try {
        console.log(req.params.id);
        const tasks = await sharedTasks.aggregate([
            {
                $match: {
                    sharedTo:new mongoose.Types.ObjectId(req.params.id)
                }
            },
            {
                $project: {
                    taskId: 1 
                }
            }
        ]);
        
        console.log(tasks, "tasks");

        if (!tasks) {
            res.status(404);
            throw new Error("Task not found");
        }

        const taskIds = tasks.map(task => task.taskId);

        const sharedTask = await task.aggregate([
            {
                $match: {
                    _id: { $in: taskIds }
                }
            }
        ]);

        console.log(sharedTask, "sharedTask");
        
        res.status(200).json({ task: sharedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const getSharedTask = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const task = await sharedTasks.findById(id);

        if (!task) {
            res.status(404);
            throw new Error("task not found");
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const updateSharedTasks = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const task = await sharedTasks.findByIdAndUpdate(id, req.body);

        if (!task) {
            res.status(404);
            throw new Error("task not found");
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const createSharedTasks = asyncHandler(async (req, res) => {
    try {
        const { sharedFrom, sharedTo, taskId } = req.body
        let From = [];

        From = sharedTo.map(a => a._id);

        const task = await sharedTasks.create({ sharedFrom, taskId, sharedTo: From });

        if (!task) {
            res.status(404);
            throw new Error("task not found");
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const DeleteSharedTasks = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const task = await sharedTasks.findByIdAndDelete(id);

        if (!task) {
            res.status(404);
            throw new Error("task not found");
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = { getSharedTasks, getSharedTask, updateSharedTasks, createSharedTasks, DeleteSharedTasks };
