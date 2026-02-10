import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/children/Home.vue')
  },

  {
    path: '/html',
    name: 'HTMLlearn',
    component: () => import('../views/TechTree.vue'),
    props: { techSlug: 'html', techName: 'HTML' },
    children: [
      {
        path: ':slug',
        name: 'HtmlLesson',
        component: () => import('../views/children/Lesson.vue')
      }
    ]
  },

  {
    path: '/css',
    name: 'CSSlearn',
    component: () => import('../views/TechTree.vue'),
    props: { techSlug: 'css', techName: 'CSS' },
    children: [
      {
        path: ':slug',
        name: 'CssLesson',
        component: () => import('../views/children/Lesson.vue')
      }
    ]
  },
  

  {
    path: '/javascript',
    name: 'jslearn',
    component: () => import('../views/TechTree.vue'),
    props: { techSlug: 'javascript', techName: 'JavaScript' },
    children: [
      {
        path: ':slug',
        name: 'JsLesson',
        component: () => import('../views/children/Lesson.vue')
      }
    ]
  },
  {
  path:'/menu',
  name:'menu',
  component: () => import('../views/children/Menu.vue'),
  }
]

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router