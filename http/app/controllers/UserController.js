const fs = require("fs");
// 导入jwt包，用于签发和验证jwt字符串
const jwt = require("jsonwebtoken");
// 不管fs读文件的操作代码挪到任何地方，其路径都不要动，其始终相对于入口文件
const jwt_secret = fs.readFileSync("./.env", "utf-8");

// 导入模型
const Model = require("../models/UserModel");

// 导出
module.exports = {
    userLogin: (req, res) => {
        // 获取用户提交过来的信息
        let data = req.body;
        // 查询数据库检查是否有当前这个用户
        // console.log(data);
        Model.getOne(data).then((ret) => {
            if (ret === null) {
                // 没有用户（输出json数据，告诉用户没有数据）
                // 不能告诉用户是帐号错了还是密码错误。
                res.send({ error_code: 1000, message: "帐号或密码错误！" });
            } else {
                // 有这个用户（签发jwt）
                res.send({
                    error_code: 0,
                    message: "ok",
                    // 两参数：载荷中我们自定义的数据，密钥
                    _token: jwt.sign({ userId: ret.userId }, jwt_secret),
                });
            }
        });
    },
    getUserInfo: (req, res) => {
        // 1. 先去验证token
        let tmp = req.headers.authorization.split(" ");
        let _token = tmp[tmp.length - 1];
        // jwt验证方法verify(token,secret)
        // 验证通过返回载荷，验证失败程序崩溃
        try {
            const payload = jwt.verify(_token, jwt_secret);
            // 限制领牌有效期只有24分钟
            // 获取当前时间的时间戳
            const date = new Date();
            const iat = payload.iat;
            if (date.getTime() / 1000 - iat > 24 * 60) {
                // 令牌过期了
                res.send({
                    error_code: 1001,
                    message: "令牌已经过期！",
                });
            } else {
                // 查询数据
                // 2. 查询数据库
                Model.getOne({ userId: payload.userId }).then((ret) => {
                    if (ret === null) {
                        res.send({
                            error_code: 1002,
                            message: "你的帐号已经被封号了！",
                        });
                    } else {
                        // 增加一个更新令牌动作
                        let _token = ""
                        if(date.getTime() / 1000 - iat > 19 * 60){
                            _token = jwt.sign({ userId: ret.userId }, jwt_secret)
                        }
                        // 3.  返回给前端
                        res.send({
                            error_code: 0,
                            message: "ok",
                            data: {
                                userId: ret.userId,
                                mobile: ret.mobile,
                                headIcon: ret.headIcon,
                                gender: ret.gender,
                            },
                            _token
                        });
                    }
                });
            }
        } catch (error) {
            throw new Error("token令牌鉴定失败！");
        }
    },
};
