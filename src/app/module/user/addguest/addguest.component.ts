import { Component, Inject, OnInit } from '@angular/core';
import { OrdersService } from '../../Service/orders.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TableService } from '../../Service/table.service';
import { Table } from '../../Model/Table';
import { Orders } from '../../Model/Orders';

@Component({
  selector: 'app-addguest',
  templateUrl: './addguest.component.html',
  styleUrls: ['./addguest.component.css']
})
export class AddguestComponent implements OnInit{
  constructor(private orderservice:OrdersService,private formbuilder:FormBuilder,private router:Router,@Inject(MAT_DIALOG_DATA) public data: {tableName:string},private dialog:MatDialog,private tableservice:TableService){}
  tabledata!:Table
  orders!:Orders
  ngOnInit(): void {
      this.data.tableName

      this.tableservice.getBytableName(this.data.tableName).subscribe((res) =>{
        res ? this.tabledata = res : ''
        console.log("🚀 ~ file: addguest.component.ts:23 ~ AddguestComponent ~ this.tableservice.getBytableName ~ res:", res)
      })
  }

  formaddguest = this.formbuilder.group({
    guestQty:0 ,
    guestChild:0 ,
    totalGuest:0 ,
    guestPromotion:0 ,
    totalPrice:0 ,
    tableName:this.data.tableName
  })

  Onsubmit(){
    const AddGuestDto = this.formaddguest.value;
    const tableStatus = 2
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
        this.tabledata.tableStatus = tableStatus    
        this.orderservice.SaveOders(AddGuestDto).subscribe(res => {
          res ? this.orders = res : '';
          this.tabledata.ordersId = this.orders.ordersId
          this.tableservice.updateTable(this.tabledata.tableId,this.tabledata).subscribe(()=>{
   Swal.fire(
            'Sucess',
            'Your file has been Compelete.',
            'success'
          );   window.location.reload(),1200
          })
         
  
       
        
        });
  
      }
    })
  }
}
