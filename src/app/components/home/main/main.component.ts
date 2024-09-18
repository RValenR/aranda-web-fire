import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainService } from '../../../services/main/main.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RegisterPlantsFormComponent } from '../commons/register-plants-form/register-plants-form.component';
import { SidebarComponent } from '../commons/sidebar/sidebar.component';
import { TopbarComponent } from '../commons/topbar/topbar.component';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ButtonModule, 
    InputTextModule, DialogModule, RegisterPlantsFormComponent, SidebarComponent, TopbarComponent, TableModule, FontAwesomeModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  faEye = faEye;
  isModalOpen = false;
  visible: boolean = false;
  items: any;

  firebaseService = inject(AuthService);
  router = inject(Router);
  dataService = inject(MainService);

  isSideNavCollapsed = false;
  screenWidth = 0;

  public specialStyleClass = '';
  public topbarStyle = '';

  ngOnInit() {
    this.fetchItems();
    // this.dataService.getElements()
    // this.products = this.dataService.jsonItems
    // console.log('ALLL ITEMS',this.dataService.jsonItems);
    // this.dataService.getImages();
  }

  async fetchItems() {
    try {
      const jsonItems = await this.dataService.getElements()
      this.items = jsonItems;
      console.log('Datos recibidos:', jsonItems);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }

  onToggleSideNav(data: SideNavToggle) {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;


    if (data.collapsed) {
      this.specialStyleClass = 'body-trimmed-aux';
      this.topbarStyle = 'topbarExpanded';
    } else if (!data.collapsed) {
      this.specialStyleClass = 'body-md-screen-aux';
      this.topbarStyle = 'topbarUnexpanded';
    }
    console.log(this.specialStyleClass);
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    console.log(file)
    this.dataService.uploadFile(file);
  }

  actionSelected(data: any) {
    console.log(data);
    if (data.action === 'addNew') {
      this.visible = true;
    }
    if (data.action === 'logOut') {
      this.logout()
    }
  }

  addPlant() {
    this.visible = true;
  }

  logout() {
    this.firebaseService.logOut()
      .then(() => {
        this.router.navigate(['/login']);
      });
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  onIsVisible(data: any){
    console.log(data);
    this.visible = false;
  }
}
