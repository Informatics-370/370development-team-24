import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { OrderComponent } from './order/order.component';
import { TableComponent } from './table/table.component';
import { KitchenScreenComponent } from './kitchen-screen/kitchen-screen.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'order', component: OrderComponent},
  {path: 'table', component: TableComponent},
  {path: 'kitchen-screen', component: KitchenScreenComponent},
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path: '**', redirectTo: '/login', pathMatch:'full'}
  

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
