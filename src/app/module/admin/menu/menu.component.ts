import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../Service/food.service';
import { Router } from '@angular/router';
import { Usermodel } from '../../Model/Usermodel';
import { LoginService } from '../../Service/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  constructor(private foodservic:FoodService,private router:Router,private loginservice:LoginService){}
  listfood:any
  userId:any
  admindata!:Usermodel
  ngOnInit(): void {
      this.foodservic.getAllFood().subscribe(res =>{
        res ? this.listfood=res :null
        console.log("🚀 ~ file: menu.component.ts:16 ~ MenuComponent ~ this.foodservic.getAllFood ~  res:",  res)
      })
      this.userId = sessionStorage.getItem('user_id')
      this.showdataId(this.userId)
      console.log("🚀 ~ file: admin.component.ts:23 ~ AdminComponent ~ ngOnInit ~ this.userId:", this.userId)
  }
  logOut() {
    sessionStorage.removeItem('user_role');
    this.router.navigate(['home']).then(() => {
      window.location.reload()
    });
  }
  showdataId(userId:any){
    this.loginservice.GetById(userId).subscribe((res) =>{
    res ? this.admindata = res : null
    console.log("🚀 ~ file: admin.component.ts:48 ~ AdminComponent ~ showdataId ~  res:",  res)
   
    })} 
    goToDashboard(){
      this.router.navigate(['admin'])
    }
}
