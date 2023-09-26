import { LOCALE_ID,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';

import { FoodpopupComponent } from '../guest/foodpopup/foodpopup.component';
import { SearchfoodComponent } from './searchfood/searchfood.component';
import CartPageComponent from './cart-page/cart-page.component';
import { FooddetailComponent } from './fooddetail/fooddetail.component';
import { CarttestComponent } from '../guest/carttest/carttest.component';
import { MenuPageComponent } from '../guest/menu-page/menu-page.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CustomFilterPipe } from 'src/custom-filter.pipe';
import { FilterFoodPipe } from 'src/app/module/guest/Filterfood.pipe';
import { OrderlistComponent } from './orderlist/orderlist.component';



@NgModule({
  declarations: [
    TableComponent,
    FoodpopupComponent,
    SearchfoodComponent,
    CartPageComponent,
    FooddetailComponent,
    CarttestComponent,
   

   

    OrderlistComponent
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
     FormsModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forChild(),
 

    
  ]
})
export class TableModule { }
