const express = require('express')
require('dotenv').config();
const port = process.env.PORT
const cors = require("cors")
const { connectDb } = require("./config/dbConnection")
connectDb()
const app = express();
app.use(cors())
app.use(express.json());
app.use('/tasks', require('./Router/taskRouter'))
app.use('/stages', require('./Router/stagesRouter'))
app.use('/project', require('./Router/projectRouter'))

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})