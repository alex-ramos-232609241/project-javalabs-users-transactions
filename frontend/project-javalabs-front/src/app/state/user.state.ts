import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserState {
  private users$ = new BehaviorSubject<User[]>([]);

  getUsers() {
    return this.users$.asObservable();
  }

  setUsers(users: User[]) {
    this.users$.next(users);
  }

  addUser(user: User) {
    const currentUsers = this.users$.getValue();
    this.users$.next([...currentUsers, user]);
  }
}