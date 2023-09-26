import { Injectable } from '@angular/core';
import { CartItem } from '../Model/CartItem';
import { Cartmodel } from '../Model/Cartmodel';
import { Food } from '../Model/Food';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cartmodel = new Cartmodel();
  constructor() { }

  addfoodtocart(food: Food): void {
    let cartItem = this.cart.items.find(item => item.food.foodId == food.foodId);
    if (cartItem) {
      this.ChangeQty(food.foodId, cartItem.Qty + 1)
      return;
    }
  }
  removeFromCart(foodId:any):void{
    this.cart.items =
    this.cart.items.filter(item => item.food.foodId != foodId)
   }
  

  ChangeQty(foodId: any, Qty: number) {
    let cartItem = this.cart.items.find(item => item.food.foodId != foodId);
    if (!cartItem) return;
    cartItem.Qty = Qty;
  }

  getCart():Cartmodel{
    return this.cart;
   }
}
