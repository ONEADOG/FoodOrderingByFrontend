import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Service/login.service';
import { TableService } from '../Service/table.service';
import { MatDialog } from '@angular/material/dialog';
import { AddfoodComponent } from './addfood/addfood.component';
import { OrderService } from '../Service/order.service';

import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-k',
  templateUrl: './user-k.component.html',
  styleUrls: ['./user-k.component.css']
})
export class UserKComponent implements OnInit{
constructor(private router:Router,private loginservice:LoginService,private tableservice:TableService,private dialog:MatDialog,private orderService:OrderService,private formbuilder:FormBuilder){}
listorder:any
order:any
userId:any
ngOnInit(): void {
    this.listorder = this.orderService.getAll().subscribe(res =>{
      res? this.listorder = res :null
      console.log("🚀 ~ file: user-k.component.ts:20 ~ UserKComponent ~ this.listorder=this.orderService.getAll ~ res:", res)
    })
    this.userId = sessionStorage.getItem('user_id')
    console.log("🚀 ~ file: user-k.component.ts:26 ~ UserKComponent ~ ngOnInit ~  this.userId:",  this.userId)
}
formorder = this.formbuilder.group({
  orderId:0,
	orderDetail:'',
	tableName:'',
	orderStatus:0
})
showaddfood(){
  this.dialog.open(AddfoodComponent)
}
logOut() {
  sessionStorage.removeItem('user_role');
  this.router.navigate(['home']).then(() => {
    window.location.reload()
  });
}
onGetId(order:any){
  // this.router.navigate(['user/getId/'+table.tableId])
  this.order = order
}
UpdateTableStatus(newStatus:any) {
  // ตรวจสอบว่ามีข้อมูลโต๊ะที่ถูกคลิกหรือไม่ และอัปเดตสถานะโต๊ะ
  if (this.order) {
      Swal.fire({ title: 'ต้องการออเดอร์ใช่หรือไม่?',
      text: "คุณต้องการปรับสถานะใช่หรือไม่?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#56C596' ,
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก' }).then((result) =>{
         if(result.isConfirmed){
          this.order.orderStatus = newStatus;         
          this.orderService.UpdateOrder(this.order.orderId,this.order).subscribe(res => {
            Swal.fire( 'Sucess',
            'Your file has been Compelete.',
            'success');
            // window.location.reload();
          });
         }
        })
    
  }
}

}
