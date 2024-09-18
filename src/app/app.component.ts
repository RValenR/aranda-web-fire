import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { TopbarComponent } from './components/home/commons/topbar/topbar.component';
import { SidebarComponent } from './components/home/commons/sidebar/sidebar.component';
import { AuthService } from './services/auth/auth.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent, TopbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
 
  isSideNavCollapsed = false;
  screenWidth = 0;
  public specialStyleClass = '';
  public topbarStyle = '';
  visible: boolean = false;
  
  firebaseService = inject(AuthService);
  router = inject(Router);
  showComponents:any;

  ngOnInit(): void {
    this.showComponents = this.firebaseService.showInfo;
    console.log('SHOW',this.showComponents)
  }
  
  onToggleSideNav(data: SideNavToggle) {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;


    if (data.collapsed) {
      this.firebaseService.pageStyle = 'body-trimmed-aux';
      this.topbarStyle = 'topbarExpanded';
    } else if (!data.collapsed) {
      this.firebaseService.pageStyle = 'body-md-screen-aux';
      this.topbarStyle = 'topbarUnexpanded';
    }
    // console.log(this.specialStyleClass);
  }

  actionSelected(data: any) {
    console.log(data);
    if (data.action === 'addNew') {
      this.visible = true;
    }
    if (data.action === 'logOut') {
      this.logout()
      this.showComponents = false;
    }
  }

  logout() {
    this.firebaseService.pageStyle = 'full-screen';
    this.firebaseService.logOut()
      .then(() => {
        this.router.navigate(['/login']);
      });
  }

  // ngAfterViewChecked() {
  //   // Código que quieres ejecutar después de que la vista ha sido renderizada
  //   console.log('SHOW IN SERVICE', this.firebaseService.showInfo)
  // }
}
