import { ISidebarMenu } from './../../../../../shared/interface/sidebar/sidebar-menu.interface';
import { Observable } from 'rxjs';
import { LayoutService } from './../../../core/layout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  sideBarMenu$: Observable<ISidebarMenu[]>;
  constructor(private layout: LayoutService) { }

  ngOnInit(): void {
    this.sideBarMenu$ = this.layout.sideMenu$;
  }

}
