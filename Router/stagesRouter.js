const express = require('express');

const router = express.Router()

const {getStages,createStages,DeleteStage} = require('./../Controllers/stagesController')

router.route("/").get(getStages);
router.route("/").post(createStages);
router.route("/:id").delete(DeleteStage);


module.exports = router;