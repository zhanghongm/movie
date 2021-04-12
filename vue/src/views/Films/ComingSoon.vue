<template>
    <div class="container">
        <van-list
            v-model="isLoading"
            :finished="finished"
            finished-text="我是有底线的"
            @load="onLoad"
        >
            <!-- v-show控制组件是否显示 -->
            <!-- 此处与上滑事件自带的loading冲突，显示2个，这个删除 -->
            <!-- <div class="loading" v-show="isLoading">
                <van-loading size="24px" type="spinner">加载中...</van-loading>
            </div> -->
            <van-card v-for="item in list" :key="item.filmId">
                <!-- 封面图片 -->
                <template #thumb>
                    <img :src="item.poster" width="66" />
                </template>
                <!-- 电影名称 -->
                <template #title>
                    <div class="title">
                        {{ item.name }}
                        <span class="item">{{ item.filmType.name }}</span>
                    </div>
                </template>
                <!-- 电影的介绍 -->
                <template #desc>
                    <div class="desc">
                        <div class="nowPlayingFilm-buy">预约</div>
                        <div>主演：{{ item.actors | parseActors }}</div>
                        <div>
                            上映日期：
                            <span>{{ item.premiereAt | parsePremiereAt }}</span>
                        </div>
                        <div>{{ item.nation }} | {{ item.runtime }} 分钟</div>
                    </div>
                </template>
            </van-card>
        </van-list>
    </div>
</template>
<script>
// 导入地址模块
import uri from "@/config/uri";
// 导入vant组件
import Vue from "vue";
import { Loading, Toast, Card, List } from "vant";
Vue.use(Loading);
Vue.use(Toast);
Vue.use(Card);
Vue.use(List);
// 导入moment包
import moment from "moment";
export default {
    data() {
        return {
            // 列表的数据源
            list: [],
            // 控制加载组件是否显示
            isLoading: false,
            // 默认页码
            pageNum: 1,
            // 用于标记是否还有数据没请求完
            finished: false,
        };
    },
    // methods
    methods: {
        // 上滑处理程序
        onLoad() {
            // 获取数据
            this.getData();
        },
        // 专门获取网络请求的数据
        getData() {
            this.$http
                .get(uri.getComingSoon + "?pageNum=" + this.pageNum)
                .then((ret) => {
                    if (ret.status == 0) {
                        if (this.pageNum <= Math.ceil(ret.data.total / 10)) {
                            // 请求成功（注意新旧数据的整合）
                            this.list = [...this.list,...ret.data.films];
                            // 让页码加1
                            this.pageNum++;
                        } else {
                            // 没有数据（显示加载完成）
                            this.finished = true;
                        }
                    } else {
                        // 请求失败
                        Toast.fail("网络繁忙");
                    }
                    // 数据加载完成，去除加载组件的显示
                    this.isLoading = false;
                });
        },
    },
    // 过滤器
    filters: {
        // 处理演员的信息
        parseActors(actors) {
            // 由于卖座网的数据可能存在部分电影没有主演（没有actors属性）
            if (actors) {
                // 有主演
                var str = "";
                actors.forEach((el) => {
                    str += el.name + " ";
                });
                return str.substr(0, 15) + "...";
            } else {
                // 没有主演
                return "暂无主演";
            }
        },
        // 针对上映时间的处理
        parsePremiereAt(timestamp) {
            // 周几的数组（可以避免去使用分支判断）
            const arr = [
                "周日",
                "周一",
                "周二",
                "周三",
                "周四",
                "周五",
                "周六",
            ];
            // 注意时间单位的问题，接口返回的时间单位是秒，而moment时间单位是毫秒
            // 周几
            const week = arr[moment(timestamp * 1000).format("d")];
            // 日
            const day = moment(timestamp * 1000).format("D");
            // 月
            const month = moment(timestamp * 1000).format("M");
            return `${week} ${month}月${day}日`;
        },
    },
    created() {
        // 遵循原则：早获取，早显示
        // this.$http
        //     .get(uri.getNowPlaying + "?pageNum=" + this.pageNum)
        //     .then((ret) => {
        //         if (ret.status == 0) {
        //             // 请求成功
        //             this.list = ret.data.films;
        //         } else {
        //             // 请求失败
        //             Toast.fail("网络繁忙");
        //         }
        //         // 数据加载完成，去除加载组件的显示
        //         this.isLoading = false;
        //     });
        // this.getData();
    },
};
</script>

<style lang="scss" scoped>
// scoped表示样式只在当前组件内生效，不影响子组件
// 控制加载组件是否显示
.loading {
    text-align: center;
    padding-top: 5px;
}
// 去图片圆角
img {
    border-radius: 0;
}
// 样式设置
.title {
    font-size: 16px;
    color: black;
}
// 2D/3D样式
.item {
    font-size: 9px;
    color: #fff;
    background-color: #d2d6dc;
    height: 14px;
    line-height: 14px;
    padding: 0 2px;
    border-radius: 2px;
}
// 评分样式
.grade {
    color: #ffb232;
    font-size: 14px;
}
// 描述部分样式
.desc {
    font-size: 13px;
}
// 购票按钮样式
.nowPlayingFilm-buy {
    float: right;
    line-height: 25px;
    height: 25px;
    width: 50px;
    color: #ff5f16;
    font-size: 13px;
    text-align: center;
    border-radius: 2px;
    border: 1px solid #ff5f16;
    border-radius: 4px;
}
// 设置图片预览区域的宽度为66px（默认为88px）
.van-card__thumb {
    width: 66px;
    height: 92px;
}
.container {
    margin-bottom: 50px;
}
</style>
