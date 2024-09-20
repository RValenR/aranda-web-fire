import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MainService } from '../../../services/main/main.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RegisterPlantsFormComponent } from '../../commons/register-plants-form/register-plants-form.component';
import { SidebarComponent } from '../../commons/sidebar/sidebar.component';
import { TopbarComponent } from '../../commons/topbar/topbar.component';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faPlus } from '@fortawesome/free-solid-svg-icons';


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
  faPlus = faPlus;
  isModalOpen = false;
  visible: boolean = false;
  items: any;
  elementSelected:any = null;

  firebaseService = inject(AuthService);
  router = inject(Router);
  dataService = inject(MainService);

  isSideNavCollapsed = false;
  screenWidth = 0;

  public specialStyleClass = '';
  public topbarStyle = '';

  constructor(private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    this.fetchItems();
    // this.firebaseService.showInfo = true;
    // this.cdr.detectChanges();
    // this.firebaseService.pageStyle = 'body-trimmed-aux'
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

  showInPanel(element:any){
    console.log(element);
    this.elementSelected = element;
  }

  addNewData() {
    this.visible = true;
  }

  onIsVisible(data: any){
    this.visible = false;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.firebaseService.showInfo = true;
      this.firebaseService.pageStyle = 'body-trimmed-aux'
      // this.firebaseService.pageStyle = 'full-screen';
  
      // Ahora forzamos la detección de cambios de forma segura
      this.cdr.detectChanges();
    }, 0);
  }
}
