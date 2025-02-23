import { Transaction } from "./transaction.model";

interface TransactionsResponse {
    amountOfTransactions: number;
    listOfTransactions: Transaction[];
  }
export interface User {
    id?: number;        
    name: string;
    transactions?: TransactionsResponse;   
    email: string;     
    created_at?: Date;  
  }