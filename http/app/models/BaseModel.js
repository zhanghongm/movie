// 这个模型定义基础模型
// 负责基本的增删改查操作
// 由于每个表都应该具备基本的增删改查操作，所以这个模型可以被后续的每个表对应的模型给继承
// 所有模型的父模型（类）
// 父模型查哪个表由子类告诉
class BaseModel {
    // 构造函数
    constructor(tablename) {
        this.table = tablename;
    }

    // 基本的增删改查操作
    getAll() {
        return this.table.find();
    }

    // 修改.. 删除... 增加
}

module.exports = BaseModel;
