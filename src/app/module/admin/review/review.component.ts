import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usermodel } from '../../Model/Usermodel';
import { UserService } from '../../Service/user.service';
import { LoginService } from '../../Service/login.service';
import { ReviewService } from '../../Service/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit{
constructor(private router:Router,private userservice:UserService,private loginservice:LoginService,private reviewservice:ReviewService){}
admindata!:Usermodel
userId:any
listreview:any
ngOnInit(): void {
  this.reviewservice.getReviewAll().subscribe(res =>{
    res ? this.listreview = res : null
    console.log("🚀 ~ file: review.component.ts:21 ~ ReviewComponent ~ this.reviewservice.getReviewAll ~ res:", res)
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
  goToTable(){
    this.router.navigate(['admin/tabled'])
  }

}
