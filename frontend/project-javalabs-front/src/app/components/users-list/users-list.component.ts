import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserState } from '../../state/user.state';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importar Router
@Component({
  selector: 'app-users-list',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})

export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private userState: UserState,
    private router: Router //
  ) {}

  ngOnInit(): void {
    
    this.userState.getUsers().subscribe((users) => {
      this.users = users;
    });

    
    this.userService.getUsers().subscribe((users) => {
      this.userState.setUsers(users);
    });
  }

  
  viewTransactions(userId: number | undefined) {
    if (userId !== undefined) {
      this.router.navigate(['/transactions', userId]); 
    } else {
      console.error('User ID is undefined'); 
    }
  }
}