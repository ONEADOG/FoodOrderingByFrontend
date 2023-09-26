import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AdduserComponent } from './adduser/adduser.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { ReviewComponent } from './review/review.component';

import { MenuComponent } from './menu/menu.component';
import { TabledComponent } from './tabled/tabled.component';
import { CustomFilterUserPipe } from './custom-filterUser.pipe';
import { PaymentPageComponent } from './payment-page/payment-page.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdduserComponent,
    ManageuserComponent,
    EdituserComponent,
    ReviewComponent,
    MenuComponent,
    TabledComponent,
    CustomFilterUserPipe,
    PaymentPageComponent
  ],
  imports: [
    CommonModule,
     FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NgxPermissionsModule.forChild()
  ]
})
export class AdminModule { }
