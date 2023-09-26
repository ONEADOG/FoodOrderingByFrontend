import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Service/cart.service';
import { Cartmodel } from '../../Model/Cartmodel';
import { CartItem } from '../../Model/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export default class CartPageComponent implements OnInit{
  cart!:Cartmodel;
constructor(private cartservice:CartService){
  this.setCart()
}
  ngOnInit(): void {
      
  }
  removeFromCart(cartItem:CartItem){
    this.cartservice.removeFromCart(cartItem.food.foodId);
    this.setCart();
  }
  changeQuantity(cartItem:CartItem,quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartservice.ChangeQty(cartItem.food.foodId,quantity);
    this.setCart();
  }
setCart(){
this.cart = this.cartservice.getCart();
}
}
