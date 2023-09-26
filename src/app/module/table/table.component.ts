import { Component, OnInit,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../Service/food.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FoodpopupComponent } from '../guest/foodpopup/foodpopup.component';
import CartPageComponent from './cart-page/cart-page.component';
import { CarttestService } from '../Service/carttest.service';
import { Food } from '../Model/Food';
import { CarttestComponent } from '../guest/carttest/carttest.component';

import { Cartmodel } from '../Model/Cartmodel';
import { TableService } from '../Service/table.service';
import { Table } from '../Model/Table';
import { PaymentService } from '../Service/payment.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { OrderlistComponent } from './orderlist/orderlist.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
 
})
export class TableComponent implements OnInit{

constructor(private router:Router,private foodservice:FoodService,private dialog:MatDialog,private activateroute:ActivatedRoute,private cartService: CarttestService,private tableservice:TableService,private paymentservice:PaymentService,private sanitizer:DomSanitizer,){}
isChecked:boolean = true ;
cartLength: number = 0;
listfood:any
foodId:any  
table:any
tableId:any
food:any
tabledata!:Table
filterfood:any
searchText!:string
tableName:any

ngOnInit(): void {
      this.foodservice.getAllFood().subscribe(res =>{
        res ? this.listfood = res : null 
        console.log("🚀 ~ file: table.component.ts:16 ~ TableComponent ~ this.foodservice.getAllFood ~ res:", res)
        this.foodId = this.activateroute.snapshot.paramMap.get("foodId")
        this.filterfood = res
        console.log("🚀 ~ file: table.component.ts:38 ~ TableComponent ~ this.foodservice.getAllFood ~  this.filterfood:",  this.filterfood)
 })
  this.cartService.getCartLengthObservable().subscribe((length: number) => {
      this.cartLength = length;
})
  this.tableId = sessionStorage.getItem('user_id')
  console.log("🚀 ~ file: table.component.ts:37 ~ TableComponent ~ ngOnInit ~ this.tableId:", this.tableId)
  this.showdatatable(this.tableId)
  console.log("🚀 ~ file: table.component.ts:42 ~ TableComponent ~ ngOnInit ~ this.tableId:", this.tableId)
  console.log(this.filterfood);
 
}     

 gocart(){
  this.router.navigate(['table/cartt'])
}
  OngetId(food:any){
    this.router.navigate(['table/Food/'+food.foodId])
  }
  showgetId(foodId:any){
    this.dialog.open(FoodpopupComponent,foodId)
  }
  showcart(){
   this.dialog.open(CarttestComponent,{
      height:'600px',width:'500px'
    })
    // this.dialog.open(CarttestComponent)
    

  }
  showorderlist(){
    this.dialog.open(OrderlistComponent,{
       height:'700px',width:'1000px'
     })
     // this.dialog.open(CarttestComponent)
     
 
   }
  addtocart(food:Food){
    Swal.fire({ title: 'สินค้าถูกเพิ่มลงไปในตระกร้าแล้ว',
        text: "สินค้าถูกเพิ่มลงไปในตระกร้าแล้ว",
        icon: 'success',
       })  
       this.cartService.addToCart(food)
  }
     showdatatable(tableId:any){
      this.tableservice.getTableById(tableId).subscribe((res)=>{
        res ? this.tabledata = res : null
        console.log("🚀 ~ file: table.component.ts:65 ~ TableComponent ~ this.tableservice.getTableById ~ res:", res)
      })
     } 

     filter(foodType:string){
      if(foodType !='All'){
        this.filterfood = this.listfood
        .filter((f:any) =>{
          if(f.foodType == foodType ||foodType == ''){
            return f;
          }
        })
      }else{
          this.filterfood = this.listfood 
      }
     }

    showdata(foodId:number){
      this.foodservice.getFoodById(foodId).subscribe((res)=>{
        res ? this.dialog.open(FoodpopupComponent,{data:res,height:'600px',width:'800px'}) : null
      })

    }
}
