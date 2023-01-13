import { ISidebarMenu } from './../../interface/sidebar/sidebar-menu.interface';

export namespace SideBar{
  export const AdminMenu: ISidebarMenu[] = [
    {
      name: 'Dashboard',
      icon: 'duotune/general/gen025.svg',
      url: '/admin/dashboard'
    },
    {
      name: 'Users',
      icon: 'duotune/communication/com014.svg',
      url: '/admin/users'
    },
    {
      name: 'Application',
      icon: 'duotune/files/fil003.svg',
      url: '/admin/application'
    }
  ];
  export const GuestMenu: ISidebarMenu[] = [
    {
      name: 'Dashboard',
      icon: 'duotune/general/gen025.svg',
      url: '/guest/dashboard'
    },
    {
      name: 'Bookings',
      icon: 'duotune/general/gen014.svg',
      url: '/guest/bookings'
    },
    {
      name: 'Moments',
      icon: 'duotune/technology/teh002.svg',
      url: '/guest/moments'
    },
    {
      name: 'Reviews',
      icon: 'duotune/general/gen029.svg',
      url: '/guest/satisfaction'
    }
  ];
  export const StaffMenu: ISidebarMenu[] = [
    {
      name: 'Dashboard',
      icon: 'duotune/general/gen025.svg',
      url: '/staff/dashboard'
    },
    {
      name: 'Guests',
      icon: 'duotune/communication/com014.svg',
      url: '/staff/guests'
    },
    {
      name: 'Reservations',
      icon: 'duotune/general/gen014.svg',
      url: '/staff/reservations'
    },
    {
      name: 'Moments',
      icon: 'duotune/technology/teh002.svg',
      url: '/staff/moments'
    },
    {
      name: 'Reports',
      icon: 'duotune/graphs/gra005.svg',
      url: '/staff/reports'
    }
  ];
}
