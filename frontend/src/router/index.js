import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/dashboard' },

    // Rotas públicas — com AuthLayout (tela centralizada)
    {
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'Login',
          component: () => import('@/pages/LoginPage.vue'),
          meta: { public: true },
        },
        {
          path: '/register',
          name: 'Register',
          component: () => import('@/pages/RegisterPage.vue'),
          meta: { public: true },
        },
      ],
    },

    // Rotas protegidas — com DefaultLayout (sidebar + header)
    {
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('@/pages/DashboardPage.vue'),
        },
        {
          path: '/tasks',
          name: 'Tasks',
          component: () => import('@/pages/TasksPage.vue'),
        },
        {
          path: '/tasks/:id',
          name: 'TaskDetail',
          component: () => import('@/pages/TaskDetailPage.vue'),
        },
        {
          path: '/categories',
          name: 'Categories',
          component: () => import('@/pages/CategoriesPage.vue'),
        },
        {
          path: '/reports',
          name: 'Reports',
          component: () => import('@/pages/ReportsPage.vue'),
        },
      ],
    },

    { path: '/:pathMatch(.*)*', redirect: '/dashboard' },
  ],
})

// NAVIGATION GUARD
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else if (to.meta.public && isAuthenticated) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
