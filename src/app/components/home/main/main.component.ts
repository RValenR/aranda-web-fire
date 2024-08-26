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

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ButtonModule, InputTextModule, DialogModule, RegisterPlantsFormComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  isModalOpen = false;
  visible: boolean = false;

  firebaseService = inject(AuthService);
  router = inject(Router);
  dataService = inject(MainService);

  ngOnInit(){
    this.dataService.getElements();
    this.dataService.getImages();
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
