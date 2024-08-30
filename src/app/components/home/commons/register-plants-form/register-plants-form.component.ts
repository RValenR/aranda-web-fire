import { Component, inject } from '@angular/core';
import { MainService } from '../../../../services/main/main.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register-plants-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FontAwesomeModule],
  templateUrl: './register-plants-form.component.html',
  styleUrl: './register-plants-form.component.css'
})
export class RegisterPlantsFormComponent {
  faCamera = faCamera;
  selectedImage: string | ArrayBuffer | null = null;

  dataService = inject(MainService);
  
  dataForm = new FormGroup({
    data1: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    arrivalDate: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
  });

  async submit() {
    // console.log(this.dataForm.value);
    const response = await this.dataService.addElement(this.dataForm.value);
    console.log(response);

    // Add a new document in collection "cities"
    // await setDoc(doc(this.db, "cities", "LA"), {
    //   name: "Los Angeles",
    //   state: "CA",
    //   country: "USA"
    // });
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                this.selectedImage = e.target.result; // Solo asigna si no es undefined
            }
        };
        reader.readAsDataURL(file);
    }
}
  triggerFileInput(){
    const fileInput = document.getElementById('add-new-photo') as HTMLInputElement;
    fileInput.click();
  }
}
