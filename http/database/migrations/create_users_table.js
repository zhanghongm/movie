// const mongoose = require("./cofnig/mongodb");
const { Schema } = require("../../config/mongodb");
// 建立schema
const userSchema = new Schema({
    userId: {
        type: Number,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    headIcon: {
        type: String,
        required: false,
    },
    gender: {
        type: Number,
        required: false,
        default: 0, // 0=男，1=女
    },
});

module.exports = userSchema;
