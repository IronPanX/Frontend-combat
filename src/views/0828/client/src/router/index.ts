import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/screen-share-send",
    name: "ScreenShare",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "ScreenShare" */ "../views/ScreenShareSend/index.vue"
      ),
  },
  {
    path: "/screen-share-receive",
    name: "ScreenShareReceive",
    component: () =>
      import(
        /* webpackChunkName: "ScreenShareReceive" */ "../views/ScreenShareReceive/index.vue"
      ),
  },
  {
    path: "/video-chat-host",
    name: "VideoChatHost",
    component: () =>
      import(
        /* webpackChunkName: "VideoChatHost" */ "../views/VideoChatHost/index.vue"
      ),
  },
  {
    path: "/video-chat-other",
    name: "VideoChatOther",
    component: () =>
      import(
        /* webpackChunkName: "VideoChatOther" */ "../views/VideoChatOther/index.vue"
      ),
  },
  {
    path: "/whiteboard",
    name: "Whiteboard",
    component: () =>
      import(
        /* webpackChunkName: "Whiteboard" */ "../views/Whiteboard/index.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
