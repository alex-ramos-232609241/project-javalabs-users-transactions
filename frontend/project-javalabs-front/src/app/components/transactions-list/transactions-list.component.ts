import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions-list',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css'],
})
export class TransactionsListComponent implements OnInit {
  transactions: Transaction[] = []; 
  userId: number | null = null; 

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    
    this.userId = +this.route.snapshot.paramMap.get('userId')!;

    
    if (this.userId) {
      this.transactionService.getTransactions(this.userId).subscribe((transactions) => {
        this.transactions = transactions; 
      });
    }
  }
}