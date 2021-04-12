const mongoose = require("mongoose");
// 连接mongodb
mongoose.connect("mongodb://127.0.0.1:27017/maizuo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// 导出
module.exports = mongoose;
