<template>
    <div>
        <van-index-bar :index-list="indexList">
            <template v-for="(item, index) in dataList">
                <!-- index为索引，item为城市信息集合 -->
                <van-index-anchor :index="index" :key="index">{{
                    item.title
                }}</van-index-anchor>
                <!-- item.data就是城市信息 -->
                <van-cell
                    v-for="city in item.data"
                    :key="city.cityId"
                    :title="city.name"
                    @click="changeCity(city.cityId)"
                />
            </template>
        </van-index-bar>
    </div>
</template>

<script>
// 引入vant组件
import Vue from "vue";
import { IndexBar, IndexAnchor, Cell } from "vant";
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell);
// 导入请求地址模块
import uri from "@/config/uri";
export default {
    data() {
        return {
            // 右侧的索引
            indexList: [],
            // 主体的数据
            dataList: [],
            // 临时存储26个字母的数组
            charList: [],
        };
    },
    methods: {
        changeCity(cityId){
            console.log(cityId);
            // 跳转....
        }
    },
    created() {
        // 让底部导航消失
        this.$store.commit("global/setFooter", false);
        // 发请求
        this.$http.get(uri.getCities).then((ret) => {
            if (ret.status == 0) {
                // 请求成功
                // ret.data.cities
                // 生成26个字母
                for (let i = 65; i <= 90; i++) {
                    this.charList.push(String.fromCharCode(i));
                }
                // console.log(this.charList);
                // 将26个字母与城市信息的拼音首字母进行比较，如果比上了，则大写字母包留，如果比不上，则大写字母不要
                // this.charList.forEach((el) => {
                //     // el是每个大写字母
                //     ret.data.cities.forEach((item) => {
                //         if (el.toLowerCase() == item.pinyin.substr(0, 1)) {
                //             // 判断el是否在indexList中
                //             if(!this.indexList.includes(el)){
                //                 this.indexList.push(el);
                //             }
                //         }
                //     });
                // });

                // 函数：filter
                this.charList.forEach((el) => {
                    // el每个大写字母
                    let tmp = ret.data.cities.filter(
                        (item) => el.toLowerCase() == item.pinyin.substr(0, 1)
                    );
                    // 判断是否为空
                    if (tmp.length > 0) {
                        this.indexList.push(el);
                        this.dataList.push({
                            title: el,
                            data: tmp,
                        });
                    }
                });
            }
        });
    },
    beforeDestroy() {
        // 让底部导航显示
        this.$store.commit("global/setFooter", true);
    },
};
</script>
