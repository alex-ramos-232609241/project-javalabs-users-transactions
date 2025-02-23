import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrlBase = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

 
  getUsers(): Observable<User[]> {
    return this.http.get<{ success: boolean; data: { listOfUsers: User[] } }>(`${this.apiUrlBase}/users`).pipe(
      map(response => response.data.listOfUsers)
    );
  }

 
  addUser(user: { name: string; email: string }): Observable<User> {
    return this.http.post<{ success: boolean; data: User }>(`${this.apiUrlBase}/users`, user).pipe(
      map(response => response.data)
    );
  }
  getUserTransactions(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrlBase}/transactions/${userId}`);
  }
}