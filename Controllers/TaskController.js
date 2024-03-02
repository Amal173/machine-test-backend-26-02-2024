const asyncHandler = require('express-async-handler');
const task = require("../models/taskModels");

const getTask = asyncHandler(async (req, res) => {
    try {
        const tasks = await task.aggregate([{
            $match: { projectId: req.params.id }
        }]);
        
        if (!tasks || tasks.length === 0) {
            res.status(404);
            throw new Error("Tasks not found");
        }
        
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const getSingleTask = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const tasks = await task.findById(id);

        if (!tasks) {
            res.status(404);
            throw new Error("Task not found");
        }

        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const updateTask = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const tasks = await task.findByIdAndUpdate(id, req.body);

        if (!tasks) {
            res.status(404);
            throw new Error("Task not found");
        }

        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const createTask = asyncHandler(async (req, res) => {
    try {
        const tasks = await task.create(req.body);

        if (!tasks) {
            res.status(404);
            throw new Error("Task not found");
        }

        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const updateTaskStatus = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { newStatus } = req.body;
        const updatedTask = await task.findByIdAndUpdate(id, { status: newStatus }, { new: true });

        if (!updatedTask) {
            res.status(404);
            throw new Error("Task not found");
        }

        res.json({ success: true, updatedTask });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

const DeleteTask = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const tasks = await task.findByIdAndDelete(id);

        if (!tasks) {
            res.status(404);
            throw new Error("Task not found");
        }

        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = { getTask, createTask, getSingleTask, updateTask, DeleteTask, updateTaskStatus };
