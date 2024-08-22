import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Item {
  name: string,
  id: number
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  firebaseService = inject(AuthService);
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  async submit(){
    console.log(this.loginForm.value, this.loginForm.valid);
    if(this.loginForm.valid){
      this.firebaseService.signIn(this.loginForm.value)
      .then(resp=>{
        console.log(resp);
        this.router.navigate(['/main']);
      })
    }
  }
}
