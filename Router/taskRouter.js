const express = require('express');

const router = express.Router()

const {getTask,createTask,getSingleTask,updateTask,DeleteTask,updateTaskStatus} = require('./../Controllers/TaskController')

router.route("/").get(getTask);
router.route("/").post(createTask);
router.route("/:id").get(getSingleTask);
router.route("/:id").put(updateTask);
router.route("/status/:id").put(updateTaskStatus);
router.route("/:id").delete(DeleteTask);

module.exports = router;