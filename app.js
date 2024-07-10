const express = require("express");
const { connectdb } = require("./DB/connect");
const routers=require("./router/allRouter")
const app = express();
const cors =require("cors")
require('dotenv').config();
app.use(cors("*"))
app.use(express.json());
app.use("/user",routers.userRouter)
app.use("/task",routers.taskRouter)
app.use("/list",routers.listRouter)
app.use("/category",routers.categoryRouter)
connectdb();
app.listen(process.env.PORT, () => {
    console.log("good job");
});