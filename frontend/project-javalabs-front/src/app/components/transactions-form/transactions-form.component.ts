import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-transactions-form',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions-form.component.html',
  styleUrl: './transactions-form.component.css'
})
export class TransactionsFormComponent {

}
