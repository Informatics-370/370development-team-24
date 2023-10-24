import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

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


import { SignUpComponent } from './sign-up/sign-up.component';
import { CustomAlertComponent } from './success-custom-alert/custom-alert.component';
import { EditKitchenOrderComponent } from './edit-kitchen-order/edit-kitchen-order.component';
import { ViewKitchenOrdersComponent } from './view-kitchen-orders/view-kitchen-orders.component';
import { AddKitchenOrderComponent } from './add-kitchen-order/add-kitchen-order.component';
import { UpdateKitchenOrderComponent } from './update-kitchen-order/update-kitchen-order.component';
import { AddItemComponent } from './add-item/add-item.component';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';


@NgModule({
  declarations: [AppComponent,
  LoginComponent,
  RegisterComponent,
  HomeComponent,
  OrderComponent,
  TableComponent,
  KitchenScreenComponent,
  NotificationComponent,
  SignUpComponent,
  CustomAlertComponent,
  EditKitchenOrderComponent,
  ViewKitchenOrdersComponent,
  AddKitchenOrderComponent,
  UpdateKitchenOrderComponent,
  AddItemComponent,
  PaymentModalComponent,],

 




  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  MatButtonModule,
  MatSnackBarModule,
  MatInputModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  BrowserAnimationsModule,
  CommonModule,
  
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, NotificationService, AlertController, ModalController],
  bootstrap: [AppComponent],
})
export class AppModule {}
