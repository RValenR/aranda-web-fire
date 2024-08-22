import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  firebaseService = inject(AuthService);
  router = inject(Router);


  logout(){
    this.firebaseService.logOut()
    .then(()=> {
      this.router.navigate(['/login']);
    });
    
  }
}
