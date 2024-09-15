import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOut, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  @Output() actionSelected: EventEmitter<any> = new EventEmitter();

  faSignOut = faSignOut;
  faPlus = faPlus;

  addNewData() {
    this.actionSelected.emit({ action: 'addNew' })
  }
  logOut(){
    this.actionSelected.emit({ action: 'logOut' })

  }
}
