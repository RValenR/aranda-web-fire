import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-nutrition',
  standalone: true,
  imports: [],
  templateUrl: './nutrition.component.html',
  styleUrl: './nutrition.component.css'
})
export class NutritionComponent implements OnInit{
  firebaseService = inject(AuthService);
  ngOnInit(): void {
    this.firebaseService.showInfo = true;
  }

}
