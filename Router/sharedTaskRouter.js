const express = require('express');

const router = express.Router()

const { getSharedTasks, getSharedTask, updateSharedTasks, createSharedTasks, DeleteSharedTasks } = require('./../Controllers/sharedTaskController')

router.route("/:id").get(getSharedTasks);
router.route("/single/:id").get(getSharedTask);
router.route("/").post(createSharedTasks);
router.route("/:id").delete(DeleteSharedTasks);
router.route("/:id").put(updateSharedTasks);


module.exports = router;