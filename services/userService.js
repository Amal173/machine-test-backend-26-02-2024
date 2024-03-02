// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModels');

// const getAllUsers = async () => {
//     try {
//         return await User.find();
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };

// const getOneUser = async (id) => {
//     try {
//         return await User.findById(id);
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };

// const createUser = async (username, password, email, phonenumber) => {
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         return await User.create({ username, password: hashedPassword, email, phonenumber });
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };

// const loginUser = async (email, password) => {
//     try {
//         const user = await User.findOne({ email });
//         if (!user) return null;
//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) return null;
//         const secretKey = process.env.SECRET_KEY;
//         return jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };

// module.exports = { getAllUsers, getOneUser, createUser, loginUser };
