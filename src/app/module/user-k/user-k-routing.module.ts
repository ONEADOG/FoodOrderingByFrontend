import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserKComponent } from './user-k.component';
import { ManagemenuComponent } from './managemenu/managemenu.component';

const routes: Routes = [{path:'',component:UserKComponent},{path:'managemenu',component:ManagemenuComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserKRoutingModule { }
