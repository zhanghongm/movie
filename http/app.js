// 目标：新建一个users表，并且只要需要有1条数据
const express = require("express");
const app = express();
const port = 2004;
const bodyParser = require("body-parser");
const cors = require("cors");
// 使用cors解决跨域问题
app.use(cors());
// 使用bodyparser中间件帮助接收post数据
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 路由模块化
app.use("/backend", require("./routers/backend/user"));
app.listen(port, () =>
    console.log(`server is running at htp://127.0.0.1:${port}!`)
);
