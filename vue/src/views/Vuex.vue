<template>
    <div>
        <h1>这是vuex专用组件</h1>
        <button @click="clickHandler">触发修改</button>
        <button @click="clickHandler2">模块化</button>
    </div>
</template>

<script>
// 导入map系列的方法
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
    created() {
        // 正常获取state中的数据
        // console.log(this.$store.state.num);
        // console.log(this.$store.state.num2);
        // 赋值情况（不要使用）
        // this.$store.state.num = 123456;
        // console.log(this.$store.state.num);
    },
    computed: {
        // 映射数据源，数组中写需要的数据（非模块化）
        // ...mapState(["num", "num2"]),
        // 映射处理数据程序，数组中需要写对应的方法名
        // ...mapGetters(["ageIsAdult"]),

        // 模块化映射
        // 需要通过map系列方法的第1个参数告诉其我们需要数据的空间
        ...mapState("user", ["username", "age", "email"]),
        ...mapGetters("user", ["isAdult"]),
    },
    mounted() {
        // 获取映射的数据
        // console.log(this.num);
        // console.log(this.num2);
        // 调用正常mapMutaions进来的方法
        // this.setNum(10);
        // this.setNum2(-10);
    },
    methods: {
        // 在methods中使用mapMutations方法
        // ...mapMutations(["setNum", "setNum2"]),
        // 在methods中使用mapActions方法
        // ...mapActions(["asyncSetNum2"]),

        // 模块化的映射
        ...mapMutations("user", ["setUsername"]),
        ...mapActions("user", ["asyncSetAge"]),
        clickHandler() {
            // 正常this调用修改数据（同步）的形式
            // this.$store.commit("setNum", 5);
            // this.$store.commit("setNum2", -5);
            // 正常this调用修改数据（异步）的形式
            // this.$store.dispatch("asyncSetNum2", 50);
            // this.$store.commit("setNum2", 50);
            // 通过map系列方法映射调用
            // this.asyncSetNum2(70);
            // 正常this调用getter获取处理结果
            // console.log(this.$store.getters.ageIsAdult);
            // 通过map系列映射使用
            // console.log(this.ageIsAdult);
        },

        clickHandler2() {
            // state模块化的操作方式
            // this.$store形式
            // console.log(this.$store.state.user.username);
            // mapSate形式
            // console.log(this.username);

            // mutations模块化的操作方式
            // this.$store形式
            // this.$store.commit("user/setUsername", "administrator");
            // mapMuations形式
            // this.setUsername("zhangsan");

            // actions模块化操作方式
            // this.$store形式
            // this.$store.dispatch("user/asyncSetAge", 17);
            // mapActions形式
            // this.asyncSetAge(71);

            // getters模块化操作方式
            // this.$store形式
            // console.log(this.$store.getters["user/isAdult"]);
            // mapGetters形式
            console.log(this.isAdult);
        },
    },
};
</script>
