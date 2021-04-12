<template>
    <div>
        <!-- 用于显示图片（海报） -->
        <div>
            <img v-lazy="filmInfo.poster" width="100%" />
        </div>
        <!-- 用于显示电影的介绍/详情 -->
        <div>
            <div>{{ filmInfo.name }}</div>
            <div>{{ filmInfo.category }}</div>
            <div>{{ filmInfo.premiereAt | parsePermiereAt }} 上映</div>
            <div>{{ filmInfo.nation }} | {{ filmInfo.runtime }} 分钟</div>
            <div>{{ filmInfo.synopsis }}</div>
        </div>
        <!-- 用于显示演员信息 -->
        <div>
            <Actors :key="filmInfo.actors.length">
                <!-- 给插槽填坑的（放的就是演职人员的图片） -->
                <div
                    class="swiper-slide"
                    v-for="(item, index) in filmInfo.actors"
                    :key="index"
                >
                    <img :src="item.avatarAddress" width="85" />
                </div>
            </Actors>
        </div>
        <!-- 用于显示剧照 -->
        <div></div>
    </div>
</template>

<script>
// 导入演职人员组件
import Actors from "@/views/Films/Actors";
// 导入地址模块
import uri from "@/config/uri";
// 导入vant
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);

// 配置当前图片的懒加载
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
    // loading用于配置懒加载时需要用的图片
    loading: "https://2url.cc/1OwrB",
});
// 导入moment
import moment from "moment";
// 导入映射系列的方法
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            filmInfo: { actors: [] },
        };
    },
    // 注册组件
    components: {
        Actors,
    },
    filters: {
        parsePermiereAt(timestamp) {
            // 注意时间单位的转换
            return moment(timestamp * 1000).format("YYYY-MM-DD");
        },
    },
    methods: {
        ...mapMutations("global", ["setFooter"]),
    },
    created() {
        // 请求数据
        this.$http
            .get(uri.getDetail + "?filmId=" + this.$route.params.filmId)
            .then((ret) => {
                if (ret.status == 0) {
                    // 请求成功
                    this.filmInfo = ret.data.film;
                } else {
                    // 请求有问题
                    Toast.fail(ret.msg);
                }
            });
        // 进入时通知App隐藏底部导航（emit）
        // this.$eventBus.$emit("show_jiojio", false);
        this.setFooter(false);
    },
    beforeDestroy() {
        // 离开时通知App显示底部导航（emit）
        // this.$eventBus.$emit("show_jiojio", true);
        this.setFooter(true);
    },
};
</script>
