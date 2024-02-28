const express = require('express');

const router = express.Router()

const { getStages, createStages, DeleteStage, getOneStages, updateStage } = require('./../Controllers/stagesController')

router.route("/:id").get(getStages);
router.route("/single/:id").get(getOneStages);
router.route("/:id").post(createStages);
router.route("/:id").delete(DeleteStage);
router.route("/:id").put(updateStage);


module.exports = router;