import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Service/order.service';
import { OrdersService } from '../../Service/orders.service';
import { Orders } from '../../Model/Orders';

@Component({
  selector: 'app-listorder',
  templateUrl: './listorder.component.html',
  styleUrls: ['./listorder.component.css']
})
export class ListorderComponent implements OnInit{

  constructor(private orderservice:OrderService,private ordersService:OrdersService){}
 orders!:Orders
 ordersId:any
 listorder:any
  ngOnInit(): void {
      this.ordersId = sessionStorage.getItem('user_id')
      this.showdataOrder(this.ordersId)
      console.log("🚀 ~ file: listorder.component.ts:19 ~ ListorderComponent ~ ngOnInit ~ this.ordersId:", this.ordersId)

      this.orderservice.getByordersId(this.ordersId).subscribe((res)=>{
        res ? this.listorder = res :''
        console.log("🚀 ~ file: listorder.component.ts:24 ~ ListorderComponent ~ this.orderservice.getByordersId ~ res:", res)
      })
  }
showdataOrder(ordersId:any){
  this.ordersService.getOrdersById(ordersId).subscribe((res)=>{
    res ? this.orders = res :''
    console.log("🚀 ~ file: listorder.component.ts:21 ~ ListorderComponent ~ this.ordersService.getOrdersById ~ res:", res)
  })
}
}
