import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AddtableComponent } from './addtable/addtable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';
import { EdittableComponent } from './edittable/edittable.component';
import { PaymenteditComponent } from './paymentedit/paymentedit.component';
import { AddguestComponent } from './addguest/addguest.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ReportComponent } from './report/report.component';


@NgModule({
  declarations: [
    UserComponent,
    AddtableComponent,
    EdittableComponent,
    PaymenteditComponent,
    AddguestComponent,
    ReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    NgxPermissionsModule.forChild(),
    QRCodeModule
  ]
})
export class UserModule { }
