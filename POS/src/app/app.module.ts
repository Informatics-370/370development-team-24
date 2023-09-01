import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { TableComponent } from './table/table.component';
import { KitchenScreenComponent } from './kitchen-screen/kitchen-screen.component';
import { NotificationComponent } from './notification/notification.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationService } from './service/notification.service';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment/payment.component';
import { PrintReceiptComponent } from './print-receipt/print-receipt.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CustomAlertComponent } from './success-custom-alert/custom-alert.component';
import { EditKitchenOrderComponent } from './edit-kitchen-order/edit-kitchen-order.component';
import { ViewKitchenOrdersComponent } from './view-kitchen-orders/view-kitchen-orders.component';
import { AddKitchenOrderComponent } from './add-kitchen-order/add-kitchen-order.component';



@NgModule({
  declarations: [AppComponent,
  LoginComponent,
  RegisterComponent,
  HomeComponent,
  OrderComponent,
  TableComponent,
  KitchenScreenComponent,
  NotificationComponent,
  PaymentComponent,
  PrintReceiptComponent,
  SignUpComponent,
  CustomAlertComponent,
  EditKitchenOrderComponent,
  ViewKitchenOrdersComponent,
  AddKitchenOrderComponent],

 




  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  MatButtonModule,
  MatSnackBarModule,
  MatInputModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  BrowserAnimationsModule,
  CommonModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, NotificationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
