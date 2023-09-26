import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { GuestComponent } from './guest.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MenuComponent } from './menu/menu.component';
import { CustomFilterPipe } from 'src/custom-filter.pipe';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { FilterFoodPipe } from './Filterfood.pipe';
import { PaymentTableComponent } from './payment-table/payment-table.component';
import { ListorderComponent } from './listorder/listorder.component';




@NgModule({
  declarations: [
    GuestComponent,
    MenuComponent,
    CustomFilterPipe,
    MenuPageComponent,
    FilterFoodPipe,
    PaymentTableComponent,
    ListorderComponent
  ],
  imports: [
    CommonModule,
    GuestRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPermissionsModule.forChild(),
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDialogModule,
  ]
})
export class GuestModule { }
