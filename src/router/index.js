import { createRouter, createWebHistory } from 'vue-router'
import one from '../views/one.vue'
import three from "@/views/three.vue";
import four from "@/views/four.vue";

//NTS
import NTS_Index from "@/views/NTS/NTS_Index.vue";
import NTS_Home from "@/views/NTS/NTS_Home.vue";
import NTS_Create from "@/views/NTS/NTS_Create.vue";
import NTS_My from "@/views/NTS/NTS_My.vue";
import NTS_Search from "@/views/NTS/NTS_Search.vue";
import NTS_Play from "@/views/NTS/NTS_Play.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'one',
      component: one
    },
    {
      path: '/NTS',
      name: 'NTS_Index',
      component: NTS_Index,
      children: [
        {
          path: '',
          name: 'NTS_Home',
          component: NTS_Home,
        },
        {
          path: 'NTS_Create',
          name: 'NTS_Create',
          component: NTS_Create,
        },
        {
          path: 'NTS_My',
          name: 'NTS_My',
          component: NTS_My,
        },
        {
          path: 'NTS_Search',
          name: 'NTS_Search',
          component: NTS_Search,
        },
        {
          path: 'NTS_Play',
          name: 'NTS_Play',
          component: NTS_Play,
        },
      ]
    },
    {
      path: '/three',
      name: 'three',
      component: three
    },
    {
      path: '/four',
      name: 'four',
      component: four
    },
  ]
})

export default router
