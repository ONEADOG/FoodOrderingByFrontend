import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserKRoutingModule } from './user-k-routing.module';
import { UserKComponent } from './user-k.component';
import { AddfoodComponent } from './addfood/addfood.component';
import { ManagemenuComponent } from './managemenu/managemenu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from '../user/user-routing.module';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
  declarations: [
    UserKComponent,
    AddfoodComponent,
    ManagemenuComponent
  ],
  imports: [
    CommonModule,
    UserKRoutingModule,
    ReactiveFormsModule,
    UserRoutingModule,
    NgxPermissionsModule.forChild()
  ]
})
export class UserKModule { }
