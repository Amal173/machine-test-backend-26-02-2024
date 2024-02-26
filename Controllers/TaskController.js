const asyncHandler = require('express-async-handler')
const task=require("../models/taskModels")


const getTask = asyncHandler(async (req, res) => {

    const tasks = await task.find()

    if (!tasks) {
        res.status(404);
        throw new Error("tasks not found");
    }

    res.status(200).json({ tasks })
});


const getSingleTask = asyncHandler(async (req, res) => {
const id=req.params.id
    const tasks = await task.findById(id)

    if (!tasks) {
        res.status(404);
        throw new Error("tasks not found");
    }

    res.status(200).json({ tasks })
});


const updateTask = asyncHandler(async (req, res) => {
const id=req.params.id
console.log(id);
console.log(req.body);
    const tasks = await task.findByIdAndUpdate(id,req.body)
    if (!tasks) {
        res.status(404);
        throw new Error("tasks not found");
    }

    res.status(200).json({ tasks })
});


const createTask = asyncHandler(async (req, res) => {
console.log(req.body);
    const tasks = await task.create(req.body)

    if (!tasks) {
        res.status(404);
        throw new Error("tasks not found");
    }

    res.status(200).json({ tasks })
});
const updateTaskStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { newStatus } = req.body;

    try {
        // Find the task by ID and update its status
        const updatedTask = await task.findByIdAndUpdate(id, { status: newStatus }, { new: true });

        // If the task was found and updated
        if (updatedTask) {
            res.json({ success: true, updatedTask });
        } else {
            // If the task was not found
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        // If an error occurred during the update process
        res.status(500).json({ error: 'Internal server error' });
    }
});

const DeleteTask = asyncHandler(async (req, res) => {
    const id=req.params.id
    const tasks = await task.findByIdAndDelete(id)

    if (!tasks) {
        res.status(404);
        throw new Error("tasks not found");
    }

    res.status(200).json({ tasks })
});

module.exports={getTask,createTask,getSingleTask,updateTask,DeleteTask,updateTaskStatus}