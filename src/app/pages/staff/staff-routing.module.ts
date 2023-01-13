import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: ()=> import('./dashboard/dashboard.module').then(m=>m.DashboardModule)
  },
  {
    path: 'guests',
    loadChildren: ()=> import('./guests/guests.module').then(m=>m.GuestsModule)
  },
  {
    path: 'moments',
    loadChildren: ()=> import('./moments/moments.module').then(m=>m.MomentsModule)
  },
  {
    path: 'reports',
    loadChildren: ()=> import('./reports/reports.module').then(m=>m.ReportsModule)
  },
  {
    path: 'reservations',
    loadChildren: ()=> import('./reservations/reservations.module').then(m=>m.ReservationsModule)
  },
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  // { path: '**', redirectTo: 'dashboard', }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class StaffRoutingModule { }
