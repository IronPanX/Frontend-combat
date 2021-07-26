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
            },
            {
                path: "GreyScale",
                component: () =>
                    import(/* webpackChunkName: "" */ "../views/0710/GreyScale")
            }
        ]
    },
    {
        path: "/0715",
        component: () =>
            import(/* webpackChunkName: "" */ "../views/0715/Index"),
        children: [
            {
                path: "ReverseLinkedList",
                component: () =>
                    import(/* webpackChunkName: "" */ "../views/0715/ReverseLinkedList")
            },
            {
                path: "NthBigNumberInArray",
                component: () =>
                    import(/* webpackChunkName: "" */ "../views/0715/NthBigNumberInArray")
            }
        ]
    },
    {
        path: "/0717",
        component: () =>
            import(/* webpackChunkName: "" */ "../views/0717/Index"),
        children: [
            {
                path: "RenderFunction",
                component: () =>
                    import(/* webpackChunkName: "" */ "../views/0717/RenderFunction")
            }
        ]
    },
    {
        path: "/0722",
        component: () =>
            import(/* webpackChunkName: "" */ "../views/0722/Index"),
        children: [
            {
                path: "OnlineEditorPreview",
                component: () =>
                    import(/* webpackChunkName: "" */ "../views/0722/OnlineEditorPreview/Index")
            }
        ]
    }
];

const router = new VueRouter({
    routes,
});

export default router;
