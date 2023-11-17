import { RouteRecordRaw } from 'vue-router';
import HomePage from 'src/pages/homePage/homePage.vue';
import { RouteName } from 'src/store/constants';
import { authGuard } from './routesGuard';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => HomePage,
        name: RouteName.HOME,
        beforeEnter: authGuard,
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
