export interface Transaction {
    id?: number;              
    user_id: number;          
    type: 'deposit' | 'withdrawal';
    amount: number;          
    created_at?: Date;              
  }
  