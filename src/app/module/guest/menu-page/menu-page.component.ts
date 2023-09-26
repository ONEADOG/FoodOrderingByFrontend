import { Component, OnInit,Pipe, PipeTransform, } from '@angular/core';
import { TableService } from '../../Service/table.service';
import { FoodService } from '../../Service/food.service';
import { Food } from '../../Model/Food';
import { CartService } from '../../Service/cart.service';
import { CarttestService } from '../../Service/carttest.service';
import { Table } from '../../Model/Table';
import { Typefood } from '../../Model/Typefood';
import Swal from 'sweetalert2';
import { Orders } from '../../Model/Orders';
import { OrderService } from '../../Service/order.service';
import { OrdersService } from '../../Service/orders.service';
import { MatDialog } from '@angular/material/dialog';
import { FoodpopupComponent } from '../foodpopup/foodpopup.component';


@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css'],

})
export class MenuPageComponent implements OnInit{
constructor(private tableservice:TableService,private foodservice:FoodService,private cartservice:CarttestService,private orderservice:OrdersService,private dialog:MatDialog){}
tableId:any
listfood:any
filterfood:any
orders!:Orders
typefood!:Typefood
listtype:any
searchText:any 
ordersId:any
ngOnInit(): void {
 
        this.foodservice.getAllFood().subscribe(res =>{
          res ? this.filterfood = res : null 
          console.log("🚀 ~ file: table.component.ts:16 ~ TableComponent ~ this.foodservice.getAllFood ~ res:", res)})
            
          console.log("🚀 ~ file: menu-page.component.ts:26 ~ MenuPageComponent ~ ngOnInit ~ this.filterfood:", this.filterfood )

          this.ordersId = sessionStorage.getItem('user_id')
          console.log("🚀 ~ file: menu-page.component.ts:29 ~ MenuPageComponent ~ ngOnInit ~ this.tableId:", this.tableId)
         this.showdata(this.ordersId) 
         console.log("🚀 ~ file: menu-page.component.ts:33 ~ MenuPageComponent ~ ngOnInit ~ this.tableId:", this.tableId)
         this.getTypeFood()
         this.foodservice.getFoodType().subscribe(res =>{
          res ? this.listtype = res : null
         })
}
addtocart(food:Food){
  Swal.fire({ title: 'สินค้าถูกเพิ่มลงไปในตระกร้าแล้ว',
      text: "สินค้าถูกเพิ่มลงไปในตระกร้าแล้ว",
      icon: 'success',
     })  
     this.cartservice.addToCart(food)
}
filterByFoodType(type: string) {
  this.filterfood = this.listfood.filter((food: { foodType: string; }) => food.foodType === type);
}
filter(type: string) {
  this.filterfood = this.listfood.filter((food: { foodType: string; }) => food.foodType === type);
}
 showdata(ordersId:any){
  this.orderservice.getOrdersById(ordersId).subscribe((res) =>{
    res ? this.orders = res : null
    console.log("🚀 ~ file: menu-page.component.ts:57 ~ MenuPageComponent ~ this.tableservice.getTableById ~ res:", res)
   
  } )
 }

 getTypeFood(){
 this.foodservice.getFoodType().subscribe(res =>{
 res ? this.typefood = res : null
 console.log("🚀 ~ file: menu-page.component.ts:67 ~ MenuPageComponent ~ this.foodservice.getFoodType ~  res:",  res)
 })
 }
 showdatafood(foodId:number){
  this.foodservice.getFoodById(foodId).subscribe((res)=>{
    res ? this.dialog.open(FoodpopupComponent,{data:res,height:'500px',width:'600px'}) : null
  })

}
}
