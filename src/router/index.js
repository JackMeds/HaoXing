import VueRouter from "vue-router";
import Home from "../view/Home.vue";
import person from "@/view/person";
import news from "@/view/news";
import knowledge from "@/view/knowledge";
import detail from "@/view/detail";
import login from "@/view/login";
import reg from "@/view/register";
import knowledgeDetail from "@/view/knowledgeDetail";
import chinaList from "@/view/chinaList";
import greeceList from "@/view/greeceList";
import japanList from "@/view/japanList";
import shop from "@/view/shop";

const router = new VueRouter({
  routes: [
    //配置路由的路径
    {
      path: "/",
      component: Home,
    },
    {
      path: "/person",
      component: person,
    },
    {
      path: "/news",
      component: news,
    },
    {
      path: "/knowledge",
      component: knowledge,
    },
    {
      path: "/detail/:id",
      component: detail,
    },
    {
      path: "/knowledgeDetail/:id",
      component: knowledgeDetail,
    },
    {
      path: "/login",
      component: login,
    },
    {
      path: "/register",
      component: reg,
    },
    {
        path: "/chinaList",
        component: chinaList,
    },
    {
        path: "/greeceList",
        component: greeceList,
    },
    {
        path: "/japanList",
        component: japanList,
    },
    {
        path: "/shop",
        component: shop,
    },
  ],
});
export default router;
