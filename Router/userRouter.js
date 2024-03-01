const express = require('express');
const router = express.Router()
const { getUser, getOneUser,loginUser,CreateUser } = require('./../Controllers/userController')

router.route("/").get(getUser);
router.route("/:id").get(getOneUser);
router.route("/login").post(loginUser);
router.route("/").post(CreateUser);

module.exports = router;