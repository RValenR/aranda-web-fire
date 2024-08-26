import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  firebaseService = inject(AuthService);
  router = inject(Router);

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    passwordConfirm: new FormControl('', [Validators.required])
  });

  async submit() {
    console.log(this.registerForm.value, this.registerForm.valid);
    if (this.registerForm.valid &&
      (this.registerForm.value.password === this.registerForm.value.passwordConfirm)) {
      this.firebaseService.signUp(this.registerForm.value)
        .then(resp => {
          console.log(resp);
          this.router.navigate(['/main']);
        })
    }else{
      console.log('Los datos no son validos')
    }
  }

  redirectToLogin() {
    console.log('redirect')
    this.router.navigate(['/login'])
  }
}
