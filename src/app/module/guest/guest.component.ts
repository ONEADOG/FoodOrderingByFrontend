import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../Service/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Orders } from '../Model/Orders';

import Swal from 'sweetalert2';
import { Food } from '../Model/Food';
import { FoodService } from '../Service/food.service';
import { MatDialog } from '@angular/material/dialog';
import { FoodpopupComponent } from './foodpopup/foodpopup.component';
import { CarttestComponent } from './carttest/carttest.component';
import { ListorderComponent } from './listorder/listorder.component';
declare var window :any;
@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit{
constructor(private ordersservice:OrdersService,private router:Router,private activaterout:ActivatedRoute,private foodservice:FoodService,private dialog:MatDialog){}
ordersId:any
orders!:Orders
listorders:any;
searchText:any;
listfood!:any;
  ngOnInit(): void {
      this.ordersId = this.activaterout.snapshot.paramMap.get('ordersId')
      this.showdata(this.ordersId)
      console.log("🚀 ~ file: guest.component.ts:18 ~ GuestComponent ~ ngOnInit ~ this.ordersId:", this.ordersId)
      this.ordersservice.getOrders().subscribe(res =>{
        res ? this.listorders = res : null
        console.log("🚀 ~ file: guest.component.ts:22 ~ GuestComponent ~ this.ordersservice.getOrders ~ res:", res)
      })

      this.foodservice.getAllFood().subscribe(res =>{
        res ? this.listfood = res : 'ไม่พบข้อมูล'
        console.log("🚀 ~ file: guest.component.ts:33 ~ GuestComponent ~ this.foodservice.getAllFood ~ res:", res)
      })
    }

  showdata(ordersId:number){
    this.ordersservice.getOrdersById(ordersId).subscribe((res)=>{
      res ? this.orders =res :null 
      console.log("🚀 ~ file: guest.component.ts:22 ~ GuestComponent ~ this.ordersservice.getOrdersById ~ res:", res)
      sessionStorage.removeItem('user_role');
      sessionStorage.removeItem('user_id'); 

      sessionStorage.setItem('user_id',res.ordersId)
      sessionStorage.setItem('user_role',"guest")
    })
  }
  logOut(){
    Swal.fire({
      icon: 'warning',
      title: 'ออกจากระบบหรือไม่ ?',
      text: '',
      showCancelButton: true,
      confirmButtonText: 'ออกจากระบบ',
      confirmButtonColor: 'green',
      cancelButtonText: 'อยู่ในระบบต่อ',
      cancelButtonColor: 'red',
    }).then((result)=>{
      if(result.isConfirmed) {
        sessionStorage.removeItem('user_id')
        sessionStorage.removeItem('user_role')
       setTimeout(function(){window.location.reload();},10000) 
      }  
        
    })
   
   
  }

  showdatafood(foodId:number){
    this.foodservice.getFoodById(foodId).subscribe((res)=>{
      res ? this.dialog.open(FoodpopupComponent,{data:res,height:'600px',width:'800px'}) : null
    })

  }

  gotomenupage(){
    this.router.navigate(['guest/menu'])
  }
  showcart(){
    this.dialog.open(CarttestComponent,{
       height:'600px',width:'500px'
     })
     // this.dialog.open(CarttestComponent)
     
 
   }
   showlistorder(){
    this.dialog.open(ListorderComponent,{
       height:'600px',width:'500px'
     })
     // this.dialog.open(CarttestComponent)
     
 
   }
}
