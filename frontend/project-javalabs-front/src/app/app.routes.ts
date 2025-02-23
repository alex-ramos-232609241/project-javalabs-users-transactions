import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPageComponent } from './components/users-page/users-page.component'; 
import { TransactionsFormComponent } from './components/transactions-form/transactions-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'usuarios', component: UsersPageComponent }, 
  { path: 'transactions', loadChildren: () => import('./components/transactions-list/transactions-list.component').then(m => m.TransactionsListComponent) }, 
  { path: 'transacciones', component: TransactionsFormComponent }, 
  { path: '**', redirectTo: '' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }