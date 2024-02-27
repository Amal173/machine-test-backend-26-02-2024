const express = require('express');

const router = express.Router()

const {getStages,createStages,DeleteStage,getOneStages,updateStage} = require('./../Controllers/stagesController')

router.route("/").get(getStages);
router.route("/:id").get(getOneStages);
router.route("/").post(createStages);
router.route("/:id").delete(DeleteStage);
router.route("/:id").put(updateStage);


module.exports = router;