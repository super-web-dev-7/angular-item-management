import { Routes } from '@angular/router';
//Layouts
import { 
  CorporateLayout,
  BlankCorporateComponent,
} from './@pages/layouts';
import { AuthGuard } from './auth/auth.guard';


export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: "/projects",
    pathMatch: 'full'
  },
  {
    path: '',
    component: CorporateLayout,
    children: [{
      path: 'projects',
      loadChildren: './projects/projects.module#ProjectsModule',
      canActivate: [AuthGuard]
    }]
  },
  {
    path: '',
    component: BlankCorporateComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
      }
    ]
  }
];
