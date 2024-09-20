import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { MainService } from '../../../services/main/main.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { ButtonModule } from 'primeng/button';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-register-plants-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FontAwesomeModule, ButtonModule, FontAwesomeModule],
  templateUrl: './register-plants-form.component.html',
  styleUrl: './register-plants-form.component.css'
})
export class RegisterPlantsFormComponent {
  @Output() onIsVisible: EventEmitter<any> = new EventEmitter();
  @ViewChild('arrivalDate') arrivalDateInput!: ElementRef;
  faCamera = faCamera;
  fatimes = faTimes;
  selectedImage: string | ArrayBuffer | null = null;
  uploadFile:any;

  visible: boolean = false;

  dataService = inject(MainService);

  dataForm = new FormGroup({
    code: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    food: new FormControl('', [Validators.required]),
    arrivalDate: new FormControl('', [Validators.required])
  });

  async submit() {
    // console.log(this.dataForm.value);
    const urlImage = this.dataService.uploadAllData(this.uploadFile, this.dataForm.value);
    this. closeModal();
    // console.log(urlImage);
    // const response = await this.dataService.addElement(this.dataForm.value);
    // console.log(response);

    // Add a new document in collection "cities"
    // await setDoc(doc(this.db, "cities", "LA"), {
    //   name: "Los Angeles",
    //   state: "CA",
    //   country: "USA"
    // });
  }

  previewImage(event: any) {
    this.uploadFile = event.target.files[0];
    if (this.uploadFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.selectedImage = e.target.result; // Solo asigna si no es undefined
        }
      };
      reader.readAsDataURL(this.uploadFile);
    }
  }
  triggerFileInput() {
    const fileInput = document.getElementById('add-new-photo') as HTMLInputElement;
    fileInput.click();
  }

  closeDialog(){
    this.visible = false;
    this.onIsVisible.emit({isVisible: this.visible});
  }

  closeModal(){
    this.visible = false;
    this.onIsVisible.emit({isVisible: this.visible}); 
  }

  // openCalendar() {
  //   this.arrivalDateInput.nativeElement.showPicker(); // Abre el calendario
  // }
}
