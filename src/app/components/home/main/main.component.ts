import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainService } from '../../../services/main/main.service';
import { ButtonModule} from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RegisterPlantsFormComponent } from '../commons/register-plants-form/register-plants-form.component';
import { SidebarComponent } from '../commons/sidebar/sidebar.component';

interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ButtonModule, InputTextModule, DialogModule, RegisterPlantsFormComponent, SidebarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  isModalOpen = false;
  visible: boolean = false;

  firebaseService = inject(AuthService);
  router = inject(Router);
  dataService = inject(MainService);

  isSideNavCollapsed = false;
  screenWidth = 0;

  public specialStyleClass = '';

  ngOnInit(){
    this.dataService.getElements();
    this.dataService.getImages();
  }

  onToggleSideNav(data: SideNavToggle){
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;


    if(data.collapsed ){
      this.specialStyleClass = 'body-trimmed-aux';
    }else if(!data.collapsed){
      this.specialStyleClass = 'body-md-screen-aux';
    }
    console.log(this.specialStyleClass);
  }

  uploadImage(event: any){
    const file = event.target.files[0];
    console.log(file)
    this.dataService.uploadFile(file);
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
}
