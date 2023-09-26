import { Injectable } from '@angular/core';
import { Food } from '../Model/Food';
import { Cartmodel } from '../Model/Cartmodel';
import { CartItem } from '../Model/CartItem';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarttestService {
  constructor() { }
  private cart:Cartmodel = new Cartmodel() ;
private cartLengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.cart.items.length);
  addToCart(food: Food){
    let cartItem = this.cart.items.find(item => item.food.foodId == food.foodId );
    
    if(cartItem){
      this.changeQuantity(food.foodId,  food.desiredQty);
      return;
    }
    this.cart.items.push(new CartItem(food)) ;
    this.cartLengthSubject.next(this.cart.items.length);
  }
  changeQuantity(foodId:any ,quantity:number){
    let cartItem = this.cart.items.find(item => item.food.foodId !=foodId);
    if(!cartItem)return;
    cartItem.Qty = quantity;
   }
  clearCart() {
    this.cart.items = [];
   
  }
  getItems() {
    return this.cart.items;
  }
  getCart():Cartmodel{
    return this.cart;
   }
   getCartLengthObservable() {
    return this.cartLengthSubject.asObservable();
  }
  removeFromCart(foodId:any):void{
    this.cart.items =
    this.cart.items.filter(item => item.food.foodId != foodId)
   }
   getTotalCartQuantity(): number {
    let totalQuantity = 0;
    for (const cartItem of this.cart.items) {
      totalQuantity += cartItem.Qty;
    }
    return totalQuantity;
  }
}
