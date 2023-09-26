import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestComponent } from './guest.component';
import { MenuComponent } from './menu/menu.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { PaymentTableComponent } from './payment-table/payment-table.component';



const routes: Routes = [  {path:'menus',component:MenuComponent},{
    path:'menu',component:MenuPageComponent},
    {path:'payment',component:PaymentTableComponent},
  {path:':ordersId',component:GuestComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
