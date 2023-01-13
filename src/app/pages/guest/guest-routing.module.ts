import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m=>m.DashboardModule)
  },
  {
    path: 'bookings',
    loadChildren: () => import('./bookings/bookings.module').then(m=>m.BookingsModule)
  },
  {
    path: 'moments',
    loadChildren: () => import('./moments/moments.module').then(m=>m.MomentsModule)
  },
  {
    path: 'satisfaction',
    loadChildren: () => import('./satisfaction/satisfaction.module').then(m=>m.SatisfactionModule)
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
  exports: [RouterModule]
})
export class GuestRoutingModule { }
