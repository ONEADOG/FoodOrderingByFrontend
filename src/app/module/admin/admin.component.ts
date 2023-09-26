import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import { LoginService } from '../Service/login.service';
import { FormBuilder } from '@angular/forms';
import { Usermodel } from '../Model/Usermodel';
import { StatService } from '../Service/stat.service';
import { FoodService } from '../Service/food.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent  implements OnInit{
  listuser:any
  admindata!:Usermodel
  userId:any
  statprice:number=0
  statquest:number=0
  randomfood:any
  constructor(private router:Router,private userservice:UserService,private loginservice:LoginService,private formbuilder:FormBuilder,private statservice:StatService,private foodservice:FoodService){}
  ngOnInit(): void {
      this.userservice.GetAllUser().subscribe(res =>{
        res ? this.listuser = res : null
        console.log("🚀 ~ file: manageuser.component.ts:16 ~ ManageuserComponent ~ this.userservice.GetAllUser ~ res:", res)
      })
      this.userId = sessionStorage.getItem('user_id')
      this.showdataId(this.userId)
      console.log("🚀 ~ file: admin.component.ts:23 ~ AdminComponent ~ ngOnInit ~ this.userId:", this.userId)

      this.statservice.getTotalprice().subscribe(res =>{
        res ? this.statprice = res :null
        console.log("🚀 ~ file: admin.component.ts:31 ~ AdminComponent ~ this.statservice.getTotalprice ~ res:", res)
      })
      this.statservice.getTotalGuest().subscribe(res =>{
        res ? this.statquest = res :null
        console.log("🚀 ~ file: admin.component.ts:36 ~ AdminComponent ~ this.statservice.getTotalGuest ~ res:", res)
      })
      this.foodservice.Randomfood().subscribe(res =>{
        res ? this.randomfood = res :''
      })
  }
  logOut() {
    Swal.fire({
      title: 'ต้องการออกจากระบบหรือไม่',
      text: "ต้องการออกจากระบบใช่หรือไม่?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#56C596' ,
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก' 
    }).then((result) =>{
      if(result.isConfirmed){ sessionStorage.removeItem('user_role');
    this.router.navigate(['home']).then(() => {
      window.location.reload()
    });} 
    })
  
  }
  formuset = this.formbuilder.group({
    username:'',
    password:'',
   userId:0,
    firstName:'',
   lastName:'',
   userAge:0,
   userPhone:'',
   userImage:'',
   userType:'',
   userStatus:0,
  })
  showdataId(userId:any){
    this.loginservice.GetById(userId).subscribe((res) =>{
    res ? this.admindata = res : null
    console.log("🚀 ~ file: admin.component.ts:48 ~ AdminComponent ~ showdataId ~  res:",  res)
   
    })} 


}
