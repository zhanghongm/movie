const { model } = require("../../config/mongodb");
const userSchema = require("../../database/migrations/create_users_table");
// 产生模型
const BaseModel = require("./BaseModel");

class UserModel extends BaseModel {
    constructor() {
        super(model("User", userSchema, "users"));
    }

    // 查询单个数据
    getOne(where) {
        return this.table.findOne(where);
    }
}

// 导出
module.exports = new UserModel();
