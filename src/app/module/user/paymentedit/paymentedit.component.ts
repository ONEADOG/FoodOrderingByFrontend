import { Component, OnInit,Inject } from '@angular/core';
import { PaymentService } from '../../Service/payment.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-paymentedit',
  templateUrl: './paymentedit.component.html',
  styleUrls: ['./paymentedit.component.css']
})
export class PaymenteditComponent implements OnInit{

constructor(private paymentservice:PaymentService,@Inject(MAT_DIALOG_DATA)private data:any,private formbuilder:FormBuilder,private activaterouter:ActivatedRoute){}
paymentId:any
formpayment = this.formbuilder.group({
  paymentId:0,
	tableName:'',
	guestQty:0,
	promotion:0,
	totalPrice:0,
	slipImage:'',
	paymentType:'',
	paymentDate:'',
	paymentStatus:0
}) 

ngOnInit(): void {
  this.paymentId = this.activaterouter.snapshot.paramMap.get("paymentId");
 if(this.data){
  this.initDataForEdit(this.data)}
  }
  initDataForEdit(res:any){
    this.formpayment.patchValue({
      paymentId:res.paymentId,
      tableName:res.tableName,
      guestQty:res.guestQty,
      promotion:res.promotion,
      totalPrice:res.totalPrice,
      slipImage:res.slipImage,
      paymentType:res.paymentType,
      paymentDate:res.paymentDate,
      paymentStatus:res.paymentStatus
    })
  }
}
