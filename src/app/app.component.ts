import { Component,OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginComponent } from './module/login/login.component';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxPermissionsService } from 'ngx-permissions';
import { OrdersService } from './module/Service/orders.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'fontendproject';

  constructor( private permissionsService: NgxPermissionsService,private ordersservice:OrdersService,private activaterout:ActivatedRoute){
    // this.innitrolePermission()
  }
ngOnInit(): void {
  // this.ordersId = this.activaterout.snapshot.paramMap.get('ordersId')
}
// innitrolePermission(){
//   const user_role = sessionStorage.getItem('user_role');
//   const role: string =
//   user_role != null && user_role != undefined ? user_role : '';
// console.log('log role >>:', role);
// this.permissionsService.addPermission(role);
// }

}