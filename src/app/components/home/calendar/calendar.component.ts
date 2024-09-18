import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  firebaseService = inject(AuthService);
  ngOnInit(): void {
    this.firebaseService.showInfo = true;
    this.firebaseService.pageStyle = 'body-trimmed-aux'
  }
}
