import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { OrderComponent } from './order/order.component';
import { TableComponent } from './table/table.component';
import { KitchenScreenComponent } from './kitchen-screen/kitchen-screen.component';
import { NotificationComponent } from './notification/notification.component';
import { PaymentComponent } from './payment/payment.component';
import { Component } from 'ionicons/dist/types/stencil-public-runtime';
import { PrintReceiptComponent } from './print-receipt/print-receipt.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'order', component: OrderComponent},
  {path: 'table', component: TableComponent},
  {path: 'kitchen-screen', component: KitchenScreenComponent},
  {path: 'notification', component: NotificationComponent},
  {path: 'payment/:kitchenOrderNumber', component:PaymentComponent},
  {path: 'sign-up', component:SignUpComponent},
  {path: 'login', redirectTo: '/login', pathMatch:'full'},
  {path: '**', redirectTo: '/login', pathMatch:'full'},
  
  
  

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
