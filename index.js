const express = require('express')
require('dotenv').config();
const port = process.env.PORT
const cors = require("cors")
const { connectDb } = require("./config/dbConnection")
connectDb()
const app = express();
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))
app.use(express.json());
app.use('/tasks', require('./Router/taskRouter'))
app.use('/stages', require('./Router/stagesRouter'))
app.use('/project', require('./Router/projectRouter'))
app.use('/user', require('./Router/userRouter'))
app.use('/shared-project', require('./Router/sharedProjectRouter'))
app.use('/shared-task', require('./Router/sharedTaskRouter'))

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})