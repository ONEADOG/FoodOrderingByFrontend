import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { MenuComponent } from './menu/menu.component';

import { ReviewComponent } from './review/review.component';
import { TabledComponent } from './tabled/tabled.component';

const routes: Routes = [
  {path:'',component:AdminComponent},
  {path:'manageuser',component:ManageuserComponent},
  {path:'getId/:userId',component:EdituserComponent},
  {path:'menu',component:MenuComponent},{path:'tabled',component:TabledComponent},{path:'review',component:ReviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
