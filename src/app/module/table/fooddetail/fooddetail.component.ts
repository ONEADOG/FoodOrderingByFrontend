import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CarttestService } from '../../Service/carttest.service';
import { Food } from '../../Model/Food';

@Component({
  selector: 'app-fooddetail',
  templateUrl: './fooddetail.component.html',
  styleUrls: ['./fooddetail.component.css']
})
export class FooddetailComponent implements OnInit{
food: any;

  constructor(private route: ActivatedRoute,
    private cartService: CarttestService){}
  ngOnInit(): void {
      
  }
  addToCart(food: Food) {
    this.cartService.addToCart(food);
    window.alert('สินค้าของคุณเข้าสู่ตระกร้าแล้ว!');
  }
}
