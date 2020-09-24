const routes = [
  {
    path: '/auth',
    component: () => import('layouts/Auth.vue'),
    children: [
      // {
      //   path: 'forgotPassword',
      //   name: 'ForgotPassword',
      //   component: () => import('pages/ForgotPassword.vue')
      // },
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/auth.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('pages/auth.vue')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'profile',
        name: 'UserProfile',
        component: () => import('pages/Profile.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
