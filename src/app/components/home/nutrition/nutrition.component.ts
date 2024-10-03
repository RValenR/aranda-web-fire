import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-nutrition',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TableModule],
  templateUrl: './nutrition.component.html',
  styleUrl: './nutrition.component.css'
})
export class NutritionComponent implements OnInit{
  firebaseService = inject(AuthService);
  faPlus = faPlus;
  public specialStyleClass = '';
  items=[]
  
  constructor(private cdr: ChangeDetectorRef) {}


  ngOnInit(): void {
    // this.firebaseService.showInfo = true;
  }

  addNewNutritionData(){

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
