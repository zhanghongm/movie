export default {
    namespaced: true,
    state: {
        // 控制底部的导航是否显示
        isShowFooter: true,
        // jwt
        _token: "",
    },
    mutations: {
        // 设置是否显示底部导航的操作
        setFooter(state, arg) {
            state.isShowFooter = arg;
        },
        // 更新设置jwt
        setJwt(state, arg) {
            state._token = arg;
            // 存到localStorage中一份
            localStorage.setItem("_token", arg);
        },
    },
    actions: {},
    getters: {},
};
