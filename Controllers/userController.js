const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/userModels');
const mongoose = require('mongoose');
const Project = require('../models/projectModels');

const getUser = asyncHandler(async (req, res) => {
    try {
        let { search, id, projectid } = req.query;
        const projects = await Project.aggregate([{ $match: { _id: new mongoose.Types.ObjectId(projectid) } },
        { "$project": { "result": "$userId" } }]);
        const User = new mongoose.Types.ObjectId(id)
        let pipeline = [];
        if (search) {
            pipeline.push({
                $match: {
                    $or: [
                        { username: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } },
                    ]
                }
            });
        }
        pipeline.push({
            $match: {
                _id: { "$nin": [new mongoose.Types.ObjectId(projects[0]?.result), User] },
                role: { "$nin": ["Admin"] }
            }
        });
        const user = await users.aggregate(pipeline);
        if (!user) {
            res.status(404).json({ error: "user not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const getOneUser = asyncHandler(async (req, res) => {
    try {
        const user = await users.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const CreateUser = asyncHandler(async (req, res) => {
    const { username, password, email, phonenumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!username || !password || !email || !phonenumber) {
        return res.status(400).json({ error: "all fields are mandatory" });
    }
    try {
        const user = await users.create({ username, password: hashedPassword, email, phonenumber });
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await users.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Authentication failed due to admin not found' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(404).json({ error: 'Authentication failed due to password mismatch' });
        }
        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign({ userId: user._id }, secretKey, {
            expiresIn: '1h',
        });
        res.cookie("AuthToken", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: 60 * 60 * 1000,
        });
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Login failed', err: error.message });
    }
});

module.exports = { getUser, getOneUser, loginUser, CreateUser };
