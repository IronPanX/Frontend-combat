import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/0708",
        component: () =>
            import(/* webpackChunkName: "" */ "../views/0708/Index"),
        children: [
            {
                path: "DecFloatTo64Base",
                component: () =>
                    import(/* webpackChunkName: "" */ "../views/0708/DecFloatTo64Base")
            }
        ]
    },
    {
        path: "/0710",
        component: () =>
            import(/* webpackChunkName: "" */ "../views/0710/Index"),
        children: [
            {
                path: "MonacoEditor",
                component: () =>
                    import(/* webpackChunkName: "" */ "../views/0710/MonacoEditor")
            }
        ]
    }
];

const router = new VueRouter({
    routes,
});

export default router;
