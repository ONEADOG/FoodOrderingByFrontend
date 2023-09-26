import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableService } from '../../Service/table.service';
import { LoginService } from '../../Service/login.service';
import { Usermodel } from '../../Model/Usermodel';

@Component({
  selector: 'app-tabled',
  templateUrl: './tabled.component.html',
  styleUrls: ['./tabled.component.css']
})
export class TabledComponent implements OnInit{
 
  constructor(private router:Router,private tableservice:TableService,private loginservice:LoginService){}
  admindata!:Usermodel
  userId:any
  listTable:any
  ngOnInit(): void {
    this.userId = sessionStorage.getItem('user_id')
    this.showdataId(this.userId)
    console.log("🚀 ~ file: admin.component.ts:23 ~ AdminComponent ~ ngOnInit ~ this.userId:", this.userId)
    this.tableservice.getTableAll().subscribe(res =>{
      res ? this.listTable = res : "Not-Found"
      console.log("🚀 ~ file: tabled.component.ts:24 ~ TabledComponent ~ this.tableservice.getTableAll ~  res:",  res)
    })
 
  }
  goToDashboard(){
    this.router.navigate(['admin'])
  }
  goToMangeUser(){
    this.router.navigate(['admin/manageuser'])
  }
  goToReviews(){
    this.router.navigate(['admin/review'])
  }
  goToMenu(){
    this.router.navigate(['admin/menu'])
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
}
