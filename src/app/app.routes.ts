import { Routes } from '@angular/router';
import { AllHousesComponent } from './all-houses/all-houses.component';
import { HouseDetailComponent } from './house-detail/house-detail.component';
import { ApartmentDetailComponent } from  './apartment-detail/apartment-detail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [

  { path: '',
    redirectTo: 'app-all-houses',
    pathMatch: 'full'},
  {
    path: 'app-all-houses',
    component: AllHousesComponent,
    title: 'gh',
  },
  {
    path: 'house/:id',
    component: HouseDetailComponent,
    title: 'House details',
  },
  {
    path: 'apartment-detail/:id',
    component: ApartmentDetailComponent,
    title: 'Apartment details',
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    title: 'Login page',
   },
  ];

  export default routes;
