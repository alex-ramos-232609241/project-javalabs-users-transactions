import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-form',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css'],
})
export class UsersFormComponent {
  user = { name: '', email: '' }; 

  onSubmit() {
    console.log('Formulario enviado:', this.user);
  }
}