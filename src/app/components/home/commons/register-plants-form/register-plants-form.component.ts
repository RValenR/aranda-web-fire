import { Component, inject } from '@angular/core';
import { MainService } from '../../../../services/main/main.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-plants-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register-plants-form.component.html',
  styleUrl: './register-plants-form.component.css'
})
export class RegisterPlantsFormComponent {

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
    this.dataForm.patchValue({ image: file });
    this.dataForm.get('image')?.updateValueAndValidity();
  }
}
