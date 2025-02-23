import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = 'http://localhost:5000/users'; 

  constructor(private http: HttpClient) {}

  
  getTransactions(userId: number): Observable<Transaction[]> {
    return this.http.get<{ amountOfTransactions: number; listOfTransactions: Transaction[] }>(`${this.apiUrl}/${userId}/transactions`).pipe(
      map(response => response.listOfTransactions) 
    );
  }
  getUserTransactions(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/transactions/${userId}`);
  }
}