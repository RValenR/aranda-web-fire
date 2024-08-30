import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule} from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faTimes } from '@fortawesome/free-solid-svg-icons';

interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean
}
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, SidebarModule, ButtonModule, RouterModule, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  fatimes = faTimes;

  collapsed = false;
  screenWidth = 0
  navData = [{
    routerLink: '/main',
    icon: faHome,
    label: 'Home'
  }]

  ngOnInit(): void {
    console.log('INIT');
    this.screenWidth = window.innerWidth
  }

  toggleCollapse(){
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  closeSidenav(){
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})

  }

}
