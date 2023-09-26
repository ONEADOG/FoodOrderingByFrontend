import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../Service/food.service';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from '../../Service/cart.service';
import { Food } from '../../Model/Food';
import { CarttestService } from '../../Service/carttest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-foodpopup',
  templateUrl: './foodpopup.component.html',
  styleUrls: ['./foodpopup.component.css']
})
export class FoodpopupComponent implements OnInit{
  constructor( private router:Router,private foodservice:FoodService,private formBuiler:FormBuilder,private activaterouter:ActivatedRoute,private cartservice:CartService,private cartService: CarttestService,@Inject(MAT_DIALOG_DATA) private data: any,){}
foodId:any
food:any

// foodmodel = this.formBuiler.group({
//   foodId:0,
//   foodName:'',
//   foodQty:'',
//   foodType:'',
//   foodImage:''
// })
  ngOnInit(): void {
    this.foodId = this.activaterouter.snapshot.paramMap.get('foodId')
      if(this.data){
        this.food= this.data
      }
  }

  innitdata(res:any){
    // this.foodservice.getFoodById(foodId).subscribe((res) =>{
    //   res ? this.food = res : null
    //   console.log("🚀 ~ file: foodpopup.component.ts:29 ~ FoodpopupComponent ~ this.foodservice.getFoodById ~ res:", res)
    // })
    // this.foodmodel.patchValue({
    //   foodId:res.foodId,
    //   foodName:res.foodName,
    //  foodQty:res.foodQty,
    //  foodType:res.foodType,
    //  foodImage:res.foodImage
    // })
  }

  addToCart(){
    if(this.food.desiredQty  >= 1){
    this.cartService.addToCart(this.food)  } Swal.fire({
      title: 'สินค้าถูกเพิ่มลงไปในตระกร้าแล้',
      text: '',
      icon: 'success'
    });
    // this.router.navigate(['cart-page'])
    // this.router.navigate(['cart-page'], { relativeTo: this.activaterouter.parent });
  }
  addtocart(food:Food){
    Swal.fire({ title: 'สินค้าถูกเพิ่มลงไปในตระกร้าแล้ว',
        text: "สินค้าถูกเพิ่มลงไปในตระกร้าแล้ว",
        icon: 'success',
       })  
       this.cartService.addToCart(food)
  }
  changeDesiredQuantity(index: number) {
    const item = this.cartService.getItems()[index];
    item.Qty = item.desiredQty;
  }
}
