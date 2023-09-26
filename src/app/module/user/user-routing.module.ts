import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { EdittableComponent } from './edittable/edittable.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {path:'',component:UserComponent },
  {path:'getId/:tableId',component:EdittableComponent},{path:'report',component:ReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
