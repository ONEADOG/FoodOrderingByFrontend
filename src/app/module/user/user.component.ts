import { Component,OnInit , ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../Service/login.service';
import { UserService } from '../Service/user.service';
import { TableService } from '../Service/table.service';
import { MatDialog } from '@angular/material/dialog';
import { AddtableComponent } from './addtable/addtable.component';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { EdittableComponent } from './edittable/edittable.component';
import { FormBuilder } from '@angular/forms';
import { Usermodel } from '../Model/Usermodel';
import { PaymentService } from '../Service/payment.service';
import Swal from 'sweetalert2';
import { Payment } from '../Model/Payment';
import { Table } from '../Model/Table';
import { PaymenteditComponent } from './paymentedit/paymentedit.component';
import { AddguestComponent } from './addguest/addguest.component';
import { Orders } from '../Model/Orders';
import { OrderService } from '../Service/order.service';
import { OrdersService } from '../Service/orders.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  tableName: any;
  constructor(private router:Router,private userservice:UserService,private loginservice:LoginService,private tableservice:TableService,private dialog:MatDialog,private activaterouter:ActivatedRoute,private formbulider:FormBuilder,private paymentservice:PaymentService,private orderservice:OrdersService){
    this.Login = 'http://localhost:4200/guest/7'
  }
  orders!:Orders
  listTable:any
  listUser:any
  table:any
  userId:any
  tabledata!:Table
  user!:Usermodel
  newPromotion!:number;
  newGuestQty!:number;
  paymentdata!:Payment;
  public Login:any
  ngOnInit(): void {
    this.userservice.GetAllUser().subscribe(res =>{
      res ? this.listUser = res : null
      console.log("🚀 ~ file: user.component.ts:22 ~ UserComponent ~ this.userservice.GetAllUser ~ res:", res)
  })
 
      this.tableservice.getTableAll().subscribe(res =>{
        res ? this.listTable = res :null
        console.log("🚀 ~ file: user.component.ts:18 ~ UserComponent ~ this.tableservice.getTableAll ~ res:", res)
      })

 
     this.userId = sessionStorage.getItem('user_id')

     this.showdataId(this.userId) 
     console.log("🚀 ~ file: user.component.ts:35 ~ UserComponent ~ ngOnInit ~ this.userId:", this.userId)
    
    }
formuset = this.formbulider.group({
  username:'',
  password:'',
 userId:0,
  firstName:'',
 lastName:'',
 userAge:0,
 userPhone:'',
 userImage:'',
 userType:'',
 userStatus:0,
})

  logOut() {
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('user_role');
    this.router.navigate(['home']).then(() => {
      window.location.reload()
    });
  }
  showaddTable(){
    this.dialog.open(AddtableComponent,{width:'400px',height:'400px'})
  }

showdataId(userId:any){
  this.loginservice.GetById(userId).subscribe((res) =>{
  res ? this.user=res :  null
  console.log("🚀 ~ file: user.component.ts:70 ~ UserComponent ~ this.userservice.GetById ~ res:", res)
 
  }) 
}
  onDelete(table:any ){
    Swal.fire({
      title: 'ต้องการลบข้อมูล?',
      text: "คุณต้องการลบข้อมูลใช่หรือไม่!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tableservice.deleteById( Number (table.tableId)).subscribe(res => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.ngOnInit()
        });
      }
    })
  }
  onGetId(table:any){
    // this.router.navigate(['user/getId/'+table.tableId])
    this.table = table
    this.paymentservice.getByTableName(table.tableName).subscribe((res)=>{
      res ? this.paymentdata=res : null
    })

    this.orderservice.getOrdersById(table.ordersId).subscribe((res)=>{
      res ? this.orders = res : ''
      console.log("🚀 ~ file: user.component.ts:121 ~ UserComponent ~ this.orderservice.getById ~ res:", res)
    })
  }
  UpdateTableStatus(newStatus:number) {
    // ตรวจสอบว่ามีข้อมูลโต๊ะที่ถูกคลิกหรือไม่ และอัปเดตสถานะโต๊ะ
    if (this.table) {
        Swal.fire({ title: 'ต้องการแก้ไขสถานะโต๊ะใช่หรือไม่?',
        text: "คุณต้องการปรับสถานะใช่หรือไม่?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#56C596' ,
          cancelButtonColor: '#d33',
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก' }).then((result) =>{
           if(result.isConfirmed){
            this.table.tableStatus = newStatus;
            this.tableservice.updateTable(this.table.tableId,this.table).subscribe(res => {
              Swal.fire( 'Sucess',
              'Your file has been Compelete.',
              'success');
              window.location.reload();
            });
           }
          })
      
    }
  }
  UpdateTable(newStatus:number,reset:number) {
    // ตรวจสอบว่ามีข้อมูลโต๊ะที่ถูกคลิกหรือไม่ และอัปเดตสถานะโต๊ะ
    if (this.table) {
        Swal.fire({ title: 'ต้องการแก้ไขสถานะโต๊ะใช่หรือไม่?',
        text: "คุณต้องการปรับสถานะใช่หรือไม่?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#56C596' ,
          cancelButtonColor: '#d33',
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก' }).then((result) =>{
           if(result.isConfirmed){
            this.table.tableStatus = newStatus;
            this.table.ordersId = reset;
            this.tableservice.updateTable(this.table.tableId,this.table).subscribe(res => {
              Swal.fire( 'Sucess',
              'Your file has been Compelete.',
              'success');
              window.location.reload();
            });
           }
          })
      
    }
  }
  UpdateGuestQty() {
    // ตรวจสอบว่ามีข้อมูลโต๊ะที่ถูกคลิกหรือไม่ และอัปเดตสถานะโต๊ะ
    if (this.table && typeof this.newGuestQty == 'number') {
        Swal.fire({ title: 'ต้องการเริ่มการแก้ไขจำนวนลูกค้าใช่หรือไม่?',
        text: "คุณต้องการปรับสถานะใช่หรือไม่?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#56C596' ,
          cancelButtonColor: '#d33',
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก' }).then((result) =>{
           if(result.isConfirmed){
            this.orders.guestQty = this.newGuestQty;
            this.orderservice.UpdateOrders(this.orders.ordersId,this.orders).subscribe(res => {
              Swal.fire( 'Sucess',
              'Your file has been Compelete.',
              'success');
              // window.location.reload();
            });
           }
          })
      
    }
  }
  UpdatePromotion() {
    // ตรวจสอบว่ามีข้อมูลโต๊ะที่ถูกคลิกหรือไม่ และอัปเดตสถานะโต๊ะ
    if (this.table && typeof this.newPromotion == 'number') {
        Swal.fire({ title: 'ต้องการแก้ไขโปรโมชั่นโต๊ะใช่หรือไม่?',
        text: "คุณต้องการปรับสถานะใช่หรือไม่?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#56C596' ,
          cancelButtonColor: '#d33',
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก' }).then((result) =>{
           if(result.isConfirmed){
            this.orders.guestPromotion = this.newPromotion;
            this.tableservice.updateTable(this.orders.ordersId,this.orders).subscribe(res => {
              Swal.fire( 'Sucess',
              'Your file has been Compelete.',
              'success');
              // window.location.reload();
            });
           }
          })
      
    }
  }
  Cleartable(){
    this.table.promotion = 0;
    this.table.guestQty = 0;
    this.tableservice.updateTable(this.table.tableId,this.table).subscribe((res) =>{console.log('เคลียร์เสร็จสิ้น')})
  }
//   togleupdateStatus(newStatus:boolean){
// this.UpdateTableStatus(newStatus);
//   }
//   UpdateTableStatus(checked:boolean){
//     if(this.table){
//       this.table.tableStatus = checked ? 1 : 2;
//     }
//   }
showpayment(){
  this.paymentservice.GetAll().subscribe(res =>{
    
  })
}

OnGetpayment(tableName:any){
  this.paymentservice.getByTableName(tableName).subscribe((res) =>{
    res ? this.dialog.open(PaymenteditComponent,{data:res}) : null
  })

  
}

OnGetPaymentByOrdersId(ordersId:any){
  this.paymentservice.getPaymentByOrdersId(ordersId).subscribe((res) =>{
    res ? this.dialog.open(PaymenteditComponent,{data:res}) : null
  })
}

addguest(tableName:string){
 
 const dialog = this.dialog.open(AddguestComponent,{data:{tableName},width:'300px',height:'500px'});
  dialog.afterClosed().subscribe((result)=>{
    console.log('Dialog was closed');
  })
  
}

  createPDF() {
    const content: HTMLElement = this.pdfContent.nativeElement;

    html2canvas(content,{scale:2}).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save('bill-filename.pdf');
    });
  }

  logout( ){
    Swal.fire({
      title: 'ออกจากระบบ?',
      text: "คุณต้องการออกจากระบบใช่หรือไม่!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('user_role');
    this.router.navigate(['home']).then(() => {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      this.ngOnInit()
      window.location.reload()
    }) 
         
        
      
  }})
  }

  Report() {
    // ตรวจสอบว่ามีข้อมูลโต๊ะที่ถูกคลิกหรือไม่ และอัปเดตสถานะโต๊ะ
        Swal.fire({ title: 'ต้องการไปที่หน้ารายงานใช่หรือไม่?',
        text: "คุณต้องการออกรายงานใช่หรือไม่?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#56C596' ,
          cancelButtonColor: '#d33',
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก' }).then((result) =>{
           if(result.isConfirmed){
           this.router.navigate(['user/report']).then(res => {
              Swal.fire( 'Sucess',
              'Your file has been Compelete.',
              'success');
              // window.location.reload();
            });
           }
          })
      
    
  }
}
