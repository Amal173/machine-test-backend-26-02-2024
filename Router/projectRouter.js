const express = require('express');

const router = express.Router()

const { getProject, getOneProject, updateProject, createProject, DeleteProject } = require('./../Controllers/projectController')

router.route("/").get(getProject);
router.route("/:id").get(getOneProject);
router.route("/").post(createProject);
router.route("/:id").delete(DeleteProject);
router.route("/:id").put(updateProject);


module.exports = router;