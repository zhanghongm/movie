import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 导入需要的组件
// import Films from '@/views/Films/Index'
// import NowPlaying from "@/views/Films/NowPlaying";
// import ComingSoon from "@/views/Films/ComingSoon";
// import Detail from "@/views/Films/Detail";
// import Cinemas from "@/views/Cinemas/Index";
// import Center from "@/views/Center/Index";

// 导入经过模块化的路由
import filmRouter from "./routes/film";
import cinemaRouter from "./routes/cinema";
import centerRouter from "./routes/center";
import VuexCmp from "@/views/Vuex";
// 导入城市列表组件
import City from "@/views/City/Index";

const routes = [
    {
        path: "/",
        redirect: "/films/nowPlaying",
    },
    {
        path: "/vuex",
        component: VuexCmp,
    },
    {
        path: "/city",
        component: City,
    },
    // 模块化
    // 需要展开的，导出的是一个数组，但是人家希望要的是对象
    ...filmRouter,
    cinemaRouter,
    ...centerRouter,
    //     电影模块
    // 	        电影模块父			/films
    // 		    正在热映			/films/nowPlaying
    // 		    即将上映			/films/comingSoon
    // 	    电影详情			/film/:filmId
    // {
    //     path: "/films",
    //     component: Films,
    //     children: [
    //         { path: "nowPlaying", component: NowPlaying },
    //         { path: "comingSoon", component: ComingSoon },
    //     ],
    // },
    // {
    //     path: "/film/:filmId",
    //     component: Detail,
    // },
    // 影院模块
    // 	/cinemas
    // {
    //     path: "/cinemas",
    //     component: Cinemas,
    // },
    // 我的模块
    // 	/center
    // {
    //     path: "/center",
    //     component: Center,
    // },
    //   {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     // 坑：回头再获取路由信息的时候可能会出错（异步加载路由）
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    //   }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

// 路由守卫在这里写
// 在做鉴权的时候如果需要拦截，一定要在进入路由之前
import store from "@/store/index";
router.beforeEach((to, from, next) => {
    // console.log(to, from);//to.path
    // 定义权限数组（可以模块化）
    let quanxian = ["/balence", "/settings"];
    // 获取jwt
    let _token = store.state.global._token;
    if (_token) {
        next();
    } else {
        // 可能没登录
        if (quanxian.includes(to.path)) {
            // 登录(加上点功能，让用户登录完之后继续回到刚才想看的页面)
            router.push({ path: "/login", query: { callback: to.path } });
        } else {
            // 不需要登录
            next();
        }
    }
});

export default router;
