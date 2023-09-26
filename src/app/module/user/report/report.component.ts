import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { OrdersService } from '../../Service/orders.service';
import { PaymentService } from '../../Service/payment.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TableService } from '../../Service/table.service';
import { LoginService } from '../../Service/login.service';
import { UserService } from '../../Service/user.service';
import { Usermodel } from '../../Model/Usermodel';
import { DatePipe } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{
  userId: any;
  user!:Usermodel
  listUser:any;
  listOrders:any
  currentDate: string='';
  constructor(private router:Router,private userservice:UserService,private loginservice:LoginService,private tableservice:TableService,private dialog:MatDialog,private activaterouter:ActivatedRoute,private formbulider:FormBuilder,private paymentservice:PaymentService,private orderservice:OrdersService,private datePipe:DatePipe){}
  ngOnInit(): void {
    this.userId = sessionStorage.getItem('user_id')

    this.showdataId(this.userId) 
    console.log("🚀 ~ file: user.component.ts:35 ~ UserComponent ~ ngOnInit ~ this.userId:", this.userId)
    this.userservice.GetAllUser().subscribe(res =>{
      res ? this.listUser = res : null
      console.log("🚀 ~ file: user.component.ts:22 ~ UserComponent ~ this.userservice.GetAllUser ~ res:", res)
  })

  this.orderservice.getOrders().subscribe(res=>{
    res ? this.listOrders = res :''
    console.log("🚀 ~ file: report.component.ts:36 ~ ReportComponent ~ this.orderservice.getOrders ~ res:", res)
  })

  
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
  showdataId(userId:any){
    this.loginservice.GetById(userId).subscribe((res) =>{
    res ? this.user=res :  null
    console.log("🚀 ~ file: user.component.ts:70 ~ UserComponent ~ this.userservice.GetById ~ res:", res)
   
    }) 
  }
  getCurrentDate():void {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    if (formattedDate !== null) {
      this.currentDate = formattedDate; // กำหนดค่าเมื่อไม่เป็น null
    }
}
public openPDF(): void {

  let DATA: any = document.getElementById('htmlData');
  html2canvas(DATA).then((canvas) => {
    let fileWidth = 208;
    let fileHeight = (canvas.height * fileWidth) / canvas.width;
    const FILEURI = canvas.toDataURL('image/png');
    let PDF = new jsPDF('p', 'mm', 'a4');
    let position = 0;
    PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    PDF.save('angular-demo.pdf');
  });
}
}
