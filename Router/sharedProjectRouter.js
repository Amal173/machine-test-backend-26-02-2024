const express = require('express');

const router = express.Router()

const { getSharedProjects, getSharedProject, updateSharedProject, createSharedProject, DeleteSharedProject } = require('./../Controllers/sharedProjectController')

router.route("/:id").get(getSharedProjects);
router.route("/single/:id").get(getSharedProject);
router.route("/").post(createSharedProject);
router.route("/:id").delete(DeleteSharedProject);
router.route("/:id").put(updateSharedProject);


module.exports = router;