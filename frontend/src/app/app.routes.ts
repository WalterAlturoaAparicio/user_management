import { Routes } from '@angular/router';

export const routes: Routes = [
  {
      path: 'auth',
      loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
      path: '',
      redirectTo: '/auth/login',
      pathMatch: 'full',
  },
  // { path: 'login', component: LoginComponent },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   canActivate: [AuthGuard],
  // },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
];
