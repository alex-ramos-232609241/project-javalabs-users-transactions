import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users-page',
  standalone: true, // Marcar como standalone
  imports: [CommonModule, FormsModule], // Importar módulos necesarios
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent implements OnInit {
  users: User[] = []; 
  newUser = { name: '', email: '' }; 

  constructor(private userService: UserService) {} 

  ngOnInit(): void {
    
    this.loadUsers();
  }

  
  loadUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users; 
    });
  }

  
  addUser() {
    if (this.newUser.name && this.newUser.email) {
      this.userService.addUser(this.newUser).subscribe((user) => {
        this.users.push(user); 
        this.newUser = { name: '', email: '' }; 
      });
    }
  }

  loadTransactions(userId: number) {
    this.userService.getUserTransactions(userId).subscribe(
      (data: any) => {
        const user = this.users.find(u => u.id === userId);
        if (user) {
          user.transactions = data; 
        }
      },
      (error) => {
        console.error('Error al cargar transacciones:', error);
      }
    );
  }
}