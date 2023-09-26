import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from '../app/module/admin/admin.module';
import { LoginComponent } from './module/login/login.component';
import { TableComponent } from './module/table/table.component';
import { LogintableComponent } from './module/logintable/logintable.component';


const routes: Routes = [
  {path:'' , redirectTo:'home',pathMatch:'full'},
  {path:'home',loadChildren:() =>import('../app/module/home/home.module').then(m => m.HomeModule )},
  {path:'admin',loadChildren: () => import('../app/module/admin/admin.module').then(m => m.AdminModule)},
  {path:'user',loadChildren: () => import('../app/module/user/user.module').then(m => m.UserModule)},
  {path:'table',loadChildren: () => import('../app/module/table/table.module').then(m =>m.TableModule)},
  {path:'guest',loadChildren:() => import('../app/module/guest/guest.module').then(m =>m.GuestModule)},
  {path:'user-k',loadChildren: () => import('../app/module/user-k/user-k.module').then(m =>m.UserKModule) }
 , {path:'search/:searchTerm', component:TableComponent},{path:'logintable',component:LogintableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
