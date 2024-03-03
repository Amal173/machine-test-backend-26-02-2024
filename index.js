const express = require('express')
require('dotenv').config();
const port = process.env.PORT
const cors = require("cors")
const { connectDb } = require("./config/dbConnection")
connectDb()
const app = express();
app.use(cors({
    origin: "https://machine-test-frontend-26-02-2024-gzxo.vercel.app", // Replace with your frontend's origin
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Adjust if needed
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "*"], // Adjust if needed
  }));
app.use(express.json());
app.use('/tasks', require('./Router/taskRouter'))
app.use('/stages', require('./Router/stagesRouter'))
app.use('/project', require('./Router/projectRouter'))
app.use('/user', require('./Router/userRouter'))

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})