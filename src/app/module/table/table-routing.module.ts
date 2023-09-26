import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table.component';
import { FoodpopupComponent } from '../guest/foodpopup/foodpopup.component';
import CartPageComponent from './cart-page/cart-page.component';
import { FooddetailComponent } from './fooddetail/fooddetail.component';
import { CarttestComponent } from '../guest/carttest/carttest.component';
import { MenuPageComponent } from '../guest/menu-page/menu-page.component';



const routes: Routes = [{path:':tableId',component:TableComponent},
{path:'Food/:foodId',component:FoodpopupComponent},
// {path:'cart-page',component:CartPageComponent},
{path:'item/:foodId',component:FooddetailComponent},
{path:'cartt',component:CarttestComponent},{path:'menu',component:MenuPageComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }
