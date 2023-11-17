import { RouteName } from 'src/store/constants';
import { NavigationGuard } from 'vue-router';

export const authGuard: NavigationGuard = (to, from, next) => {
  // const userId = localStorage.getItem('userId');
  const userId = sessionStorage.getItem('userId');
  if (userId) {
    console.log('userId found: ', userId);
    next();
  } else {
    console.log('userId not found');
    next('/');
  }
};
