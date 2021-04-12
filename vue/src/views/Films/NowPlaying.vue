<template>
    <div class="container">
        <van-pull-refresh
            v-model="isLoading2"
            success-text="刷新成功"
            @refresh="onRefresh"
        >
            <!-- v-show控制组件是否显示 -->
            <div class="loading" v-show="isLoading">
                <van-loading size="24px" type="spinner">加载中...</van-loading>
            </div>
            <van-card
                v-for="item in list"
                :key="item.filmId"
                @click="goDetail(item.filmId)"
            >
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
                        <div class="nowPlayingFilm-buy">购票</div>
                        <div>
                            观众评分 <span class="grade">{{ item.grade }}</span>
                        </div>
                        <div>主演：{{ item.actors | parseActors }}</div>
                        <div>{{ item.nation }} | {{ item.runtime }} 分钟</div>
                    </div>
                </template>
            </van-card>
        </van-pull-refresh>
    </div>
</template>
<script>
// 导入地址模块
import uri from "@/config/uri";
// 导入vant组件
import Vue from "vue";
import { Loading, Toast, Card, PullRefresh } from "vant";
Vue.use(Loading);
Vue.use(Toast);
Vue.use(Card);
Vue.use(PullRefresh);
export default {
    data() {
        return {
            // 列表的数据源
            list: [],
            // 控制加载组件是否显示
            isLoading: true,
            // 控制下拉刷新的加载提示的
            isLoading2: true,
            // 默认页码
            pageNum: 1,
        };
    },
    // methods
    methods: {
        onRefresh() {
            // 发起请求获取数据
            this.getData();
        },
        // 专门获取网络请求的数据
        getData() {
            this.$http
                .get(uri.getNowPlaying + "?pageNum=" + this.pageNum)
                .then((ret) => {
                    if (ret.status == 0) {
                        if (this.pageNum <= Math.ceil(ret.data.total / 10)) {
                            // 请求成功（注意新旧数据的整合）
                            this.list = [...ret.data.films, ...this.list];
                            // 让页码加1
                            this.pageNum++;
                        }
                    } else {
                        // 请求失败
                        Toast.fail("网络繁忙");
                    }
                    // 数据加载完成，去除加载组件的显示
                    this.isLoading = false;
                    this.isLoading2 = false;
                });
        },
        // 编程导航，去详情页面
        goDetail(filmId) {
            // 切记不要给filmId前面加上“:”
            this.$router.push("/film/" + filmId);
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
        this.getData();
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
