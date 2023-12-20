import { createRouter, createWebHistory } from 'vue-router'
import one from '../views/one.vue'
import two from "@/views/two.vue";
import three from "@/views/three.vue";
import four from "@/views/four.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'one',
      component: one
    },
    {
      path: '/two',
      name: 'two',
      component: two
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
