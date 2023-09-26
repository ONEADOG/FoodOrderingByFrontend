import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarttestService } from '../../Service/carttest.service';
import { Cartmodel } from '../../Model/Cartmodel';
import { CartItem } from '../../Model/CartItem';
import { OrderService } from '../../Service/order.service';
import { FormBuilder } from '@angular/forms';

import { Table } from '../../Model/Table';
import { TableService } from '../../Service/table.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Orders } from '../../Model/Orders';
import { OrdersService } from '../../Service/orders.service';

@Component({
  selector: 'app-carttest',
  templateUrl: './carttest.component.html',
  styleUrls: ['./carttest.component.css']
})
export class CarttestComponent implements OnInit{


constructor(private router:Router, private cartService:CarttestService,private ordersservice:OrdersService,private formbulider:FormBuilder,private tableservice:TableService,private dialog:MatDialog,private orderservice:OrderService){}
cart!:Cartmodel
quantity = 1;
tabledata!:Table
tableId:any;
cartLength: number = 0;
tableName:any
ordersId:any
orders!:Orders
// formorder = this.formbulider.group({
//   orderId:0,
// 	orderDetail:'',
// 	tableName:'',
// 	orderStatus:0,
// }) 
  ngOnInit(): void {
     this.setCart()

     this.ordersId = sessionStorage.getItem('user_id')
    this.showOrders(this.ordersId)
    console.log("🚀 ~ file: carttest.component.ts:43 ~ CarttestComponent ~ ngOnInit ~ this.ordersId:", this.ordersId)

     
    
  } 
  item = this.cartService.getItems();
  clearCart() {
    this.item = [];
    return this.item;
  }
  gocart(){
    this.router.navigate(['/cartt'])
  }
  backtohome(){
    this.router.navigate(['table'])
  }
  setCart(){
    this.cart =  this.cartService.getCart()
  }
  changeQuantity(cartItem:CartItem,quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.foodId,quantity);
    this.setCart();
  }
  incrementQuantity(foodId: any) {
    let cartItem = this.cart.items.find(item => item.food.foodId === foodId);
    if (cartItem) {
      cartItem.Qty += 1; // เพิ่มค่า Qty ของ cartItem ด้วย 1
    }
  }
  showcart(tableId:any){
    this.dialog.open(CarttestComponent)
  }
reduceQuantity(foodId: any) {
    let cartItem = this.cart.items.find(item => item.food.foodId === foodId);
    if (cartItem) {
      cartItem.Qty -= 1; // เพิ่มค่า Qty ของ cartItem ด้วย 1
    }
  }
    

  Onsubmit(){
    const SelectFood =  this.cartService.getItems();
    const Orderdetail = SelectFood.map((itemcart: { food: {
      desiredQty: any; foodName: any; 
}; desiredQty: any; }) => {
 return `${itemcart.food.foodName} x ${itemcart.food.desiredQty}`;
    }).join(',');this.tableName = this.tabledata.tableName;
    const Orderdto = ({
    
      orderId:0,
 	orderDetail:Orderdetail,
 	tableName:this.tableName,
  orderQty:this.getTotalCartQuantity(),
  ordersId:this.ordersId

    }) ; Swal.fire({
      title: 'ต้องการสั่งรายการอาหาร?',
      text: "คุณต้องการสั่งรายการอาหารใช่หรือไม่?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#56C596' ,
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก' 
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderservice.SaveOrder(Orderdto).subscribe(res => {
          Swal.fire(
            'Sucess',
            'Your file has been Compelete.',
            'success'
          )
        window.location.reload()
         
        });

      }
    })
  }
  showdatatable(tableName:any){
    this.tableservice.getBytableName(tableName).subscribe((res)=>{
      res ? this.tabledata = res : null
      console.log("🚀 ~ file: table.component.ts:65 ~ TableComponent ~ this.tableservice.getTableById ~ res:", res)
    })
   } 
   removeFromCart(foodId: any): void {
    this.cartService.removeFromCart(foodId);
    this.setCart();
  }
  getTotalCartQuantity(): number {
    let totalQuantity = 0;
    for (const cartItem of this.cart.items) {
      totalQuantity += cartItem.Qty;
    }
    return totalQuantity;
  }

  showOrders(ordersId:any){
    this.ordersservice.getOrdersById(ordersId).subscribe((res) =>{
      res ? this.orders =res : ''
      console.log("🚀 ~ file: carttest.component.ts:144 ~ CarttestComponent ~ this.orderservice.getByordersId ~ res:", res)
      this.showdatatable(this.orders.tableName)
      
    })

  }
}
