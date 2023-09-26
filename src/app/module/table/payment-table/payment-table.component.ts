import { Component, OnInit } from '@angular/core';
import { TableService } from '../../Service/table.service';
import { Table } from '../../Model/Table';
import { ReviewService } from '../../Service/review.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { PaymentService } from '../../Service/payment.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { OrderService } from '../../Service/order.service';
import { OrdersService } from '../../Service/orders.service';
import { Orders } from '../../Model/Orders';

@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.css'],

})
export class PaymentTableComponent implements OnInit{
  tableId:any
  tabledata!:Table
  orders!:Orders
  // steps:number= 0;
  ordersId:any
  total:number=0;
  table:any
  amount:number=0
  public QRCodepayment:any | string = null;
  constructor(private tableservice:TableService,private reviewservice:ReviewService,private formbuilder:FormBuilder,private router:Router,private paymentservic:PaymentService,private sanitizer:DomSanitizer,private orderservice:OrdersService){}
  ngOnInit(): void {
    this.ordersId = sessionStorage.getItem('user_id')
    console.log("🚀 ~ file: table.component.ts:37 ~ TableComponent ~ ngOnInit ~ this.tableId:", this.tableId)
    this.showdatatable(this.ordersId)
    console.log("🚀 ~ file: payment-table.component.ts:17 ~ PaymentTableComponent ~ ngOnInit ~ this.tableId:", this.tableId)
    this.ordersId = this.orderservice.getOrdersById(this.ordersId)
    console.log("🚀 ~ file: menu-page.component.ts:14 ~ MenuPageComponent ~ ngOnInit ~ this.tableId:", this.tableId)
    
   this.tableservice.getBytableName(this.orders.tableName).subscribe((res)=>{
    res ? this.tabledata = res :''
    console.log("🚀 ~ file: payment-table.component.ts:43 ~ PaymentTableComponent ~ this.tableservice.getBytableName ~ res:", res)
   })


  }
  showdatatable(ordersId:any){
    this.orderservice.getOrdersById(ordersId).subscribe((res)=>{
      res ? this.orders = res : null
     this.totalprice(); this.amount = this.total;
     console.log("🚀 ~ file: payment-table.component.ts:39 ~ PaymentTableComponent ~ this.tableservice.getTableById ~ this.amount:", this.amount)
     this.paymentservic.getQrcode(this.amount).subscribe((res) =>{

      this.QRCodepayment 
      = this.sanitizer.bypassSecurityTrustResourceUrl(
        `data:image/png;base64,${res}`
      );
    });
    })
   } 

  //  nextsteps(){
  //   this.steps++;
  //  }
  //  previosteps(){
  //   this.steps--;
  //  }


   formreview = this.formbuilder.group({
    reviewDetail:'',
    reviewFood:0,
    reviewService:0,
   })

   Onsubmit(){
    const ReviewDto = this.formreview.value;
    ReviewDto.reviewFood = this.formreview.controls.reviewFood.value;
    ReviewDto.reviewService = this.formreview.controls.reviewService.value;
    Swal.fire({
      title: 'ต้องการเพิ่มผู้ใช้งาน?',
      text: "คุณต้องการเพิ่มผู้ใช้งานใช่หรือไม่?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#56C596' ,
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก' 
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.reviewservice.saveReview(ReviewDto).subscribe(res => {
          Swal.fire(
            'Sucess',
            'Your file has been Compelete.',
            'success'
          )
          this.logOut()
           } );
  
      }
    })
   }
   logOut() {
    sessionStorage.removeItem('user_role');
    this.router.navigate(['home']).then(() => {
      window.location.reload()
    });
}
totalprice(){
   this.total = this.orders.guestQty * this.orders.guestPromotion;
  this.amount = this.total;
}

formpayment = this.formbuilder.group({
  
	tableName:'',
	guestQty:0,
	promotion:0,
	totalPrice:0,
	slipImage:'',
	paymentType:'',


})
Selectfile(event:any){
  this.formpayment.controls.slipImage.setValue(event.target.files[0])

}
// Onsubmitpayment(){
//   const formData = new FormData();
//   this.totalprice();
//   formData.append('tableName',this.tabledata.tableName as string);
//   formData.append('guestQty',this.tabledata.guestQty as any );
//   formData.append('promotion',this.tabledata.promotion as any);
//   formData.append('totalPrice',this.total as any);
//   formData.append('file',this.formpayment.value.slipImage as any);
//   formData.append('paymentType',this.formpayment.value.paymentType as string);
//   new Response(formData).text().then(console.log);
//   Swal.fire({
//     title: 'ต้องการเพิ่มผู้ใช้งาน?',
//     text: "คุณต้องการเพิ่มผู้ใช้งานใช่หรือไม่?",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#56C596' ,
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'ตกลง',
//       cancelButtonText: 'ยกเลิก' 
//   }).then((result) => {
//     if (result.isConfirmed) {
//       this.UpdateTableStatus(3)
//       this.paymentservic.AddPayment(formData).subscribe(res => {
//         Swal.fire(
//           'Sucess',
//           'Your file has been Compelete.',
//           'success'
//         )
//      window.location.reload()
     
//       });

//     }
//   })
// }
// UpdateTableStatus(newStatus:any) {
//   // ตรวจสอบว่ามีข้อมูลโต๊ะที่ถูกคลิกหรือไม่ และอัปเดตสถานะโต๊ะ
//   if(newStatus !=null){
//       Swal.fire({ title: 'ต้องการเริ่มการใช้งานโต๊ะใช่หรือไม่?',
//       text: "คุณต้องการปรับสถานะใช่หรือไม่?",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#56C596' ,
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'ตกลง',
//         cancelButtonText: 'ยกเลิก' }).then((result) =>{
//          if(result.isConfirmed){
//           this.tabledata.tableStatus = newStatus;         
//           this.tableservice.updateTable(this.tabledata.tableId, this.tabledata).subscribe(res => {
//             Swal.fire( 'Sucess',
//             'Your file has been Compelete.',
//             'success');
//            window.location.reload();
//           });
//          } 
//         })
    
//       }
// }
Onsubmitpayment() {
  const formData = new FormData();
  this.totalprice();
  formData.append('tableName', this.orders.tableName as string);
  formData.append('guestQty', this.orders.guestQty as any);
  formData.append('promotion', this.orders.guestPromotion as any);
  formData.append('totalPrice', this.total as any);
  formData.append('file', this.formpayment.value.slipImage as any);
  formData.append('paymentType', this.formpayment.value.paymentType as string);

  Swal.fire({
    title: 'ต้องการเพิ่มผู้ใช้งาน?',
    text: "คุณต้องการเพิ่มผู้ใช้งานใช่หรือไม่?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#56C596',
    cancelButtonColor: '#d33',
    confirmButtonText: 'ตกลง',
    cancelButtonText: 'ยกเลิก'
  }).then((result) => {
    if (result.isConfirmed) {
      this.UpdateTableAndPayment(formData, 3);
    }
  });
}

UpdateTableAndPayment(formData: FormData, newStatus: any) {
  if (newStatus != null) {
    Swal.fire({
      // title: 'ต้องการเริ่มการใช้งานโต๊ะใช่หรือไม่?',
      // text: 'คุณต้องการปรับสถานะใช่หรือไม่?',
      // icon: 'warning',
      // showCancelButton: true,
      // confirmButtonColor: '#56C596',
      // cancelButtonColor: '#d33',
      // confirmButtonText: 'ตกลง',
      // cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tabledata.tableStatus = newStatus;
        this.tableservice.updateTable(this.tabledata.tableId, this.tabledata).subscribe(res => {
          this.paymentservic.AddPayment(formData).subscribe(res => {
            Swal.fire('Success', 'Your file has been completed.', 'success');
            window.location.reload(),120000;
          });
        });
      }
    });
  }
}

}
