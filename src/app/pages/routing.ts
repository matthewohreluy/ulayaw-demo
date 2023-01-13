import { RoleGuard } from './../modules/auth/services/guards/role.guard';
import { UserRoles } from './../shared/constants/user/user-roles';
import { Routes } from '@angular/router';
import { SideBar } from '../shared/constants/sidebar/sidebar-menu';

const Routing: Routes = [
  {
    path: 'admin',
    canLoad: [RoleGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    data: {
      sideBarMenu: SideBar.AdminMenu,
      role: UserRoles.Admin
    }
  },

  {
    path: 'guest',
    canLoad: [RoleGuard],
    loadChildren: () =>
      import('./guest/guest.module').then((m) => m.GuestModule),
      data:{
        sideBarMenu: SideBar.GuestMenu,
        role: UserRoles.Guest
      }
  },

  {
    path: 'staff',
    canLoad: [RoleGuard],
    loadChildren: () =>
      import('./staff/staff.module').then((m) => m.StaffModule),
      data:{
        sideBarMenu: SideBar.StaffMenu,
        role: UserRoles.Staff
      }
  },


  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
