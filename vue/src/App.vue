<template>
    <div id="app">
        <!-- 测试vant组件的使用的（用完即删） -->
        <!-- <van-cell title="选择单个日期" :value="date" @click="show = true" />
        <van-calendar v-model="show" @confirm="onConfirm" /> -->

        <!-- 这种方式可以让视图内容发生变化，内容一旦变化组件会重新渲染 -->
        <!-- <Footer v-show="$store.state.global.isShowFooter"></Footer> -->
        <!-- 通过计算属性来实现对应的效果 -->
        <Footer v-show="isShow"></Footer>
        <router-view />
    </div>
</template>
<script>
// 导入底部导航组件
import Footer from "@/components/Navigation/Footer";
// 导入uri地址模块（测试网络请求是否可用，用完即删）
// import uri from "@/config/uri";
// 导入vant组件（测试，用完即删）
// import Vue from "vue";
// import { Calendar,Cell } from "vant";
// Vue.use(Calendar);
// Vue.use(Cell);
export default {
    // 注册组件
    components: {
        Footer,
    },
    data() {
        return {
            // isShow: true,
        };
    },
    // vant测试代码（用完即删）
    // data() {
    //     return {
    //         date: "",
    //         show: false,
    //     };
    // },
    // methods: {
    //     formatDate(date) {
    //         return `${date.getMonth() + 1}/${date.getDate()}`;
    //     },
    //     onConfirm(date) {
    //         this.show = false;
    //         this.date = this.formatDate(date);
    //     },
    // },
    created() {
        // 测试网络请求是否可用，用完即删
        // this.$http.get(uri.getCities).then(ret => console.log(ret));

        // 开始监听show_jiojio事件
        // this.$eventBus.$on("show_jiojio", (flag) => {
        //     this.isShow = flag;
        // });
        // 根组件的前4个生命周期只走一次（根组件进来之后一直不会被销毁）
        console.log("app");
    },
    computed: {
        isShow() {
            return this.$store.state.global.isShowFooter;
        },
    },
};
</script>
<style lang="scss"></style>
