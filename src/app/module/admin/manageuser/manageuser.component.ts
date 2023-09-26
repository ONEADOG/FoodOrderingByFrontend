import { Component,OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from '../../Service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AdduserComponent } from '../adduser/adduser.component';
import { EdituserComponent } from '../edituser/edituser.component';

import { LoginService } from '../../Service/login.service';
import Swal from 'sweetalert2';
import { Usermodel } from '../../Model/Usermodel';
@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent implements OnInit{
listuser:any
searchText!:string
admindata!:Usermodel
userId:any

  constructor(private router:Router,private userservice:UserService,private dialog:MatDialog,private loginservice:LoginService){}
  ngOnInit(): void {
      this.userservice.GetAllUser().subscribe(res =>{
        res ? this.listuser = res : null
        console.log("🚀 ~ file: manageuser.component.ts:16 ~ ManageuserComponent ~ this.userservice.GetAllUser ~ res:", res)
      })
      this.userId = sessionStorage.getItem('user_id')
      this.showdataId(this.userId)
      console.log("🚀 ~ file: admin.component.ts:23 ~ AdminComponent ~ ngOnInit ~ this.userId:", this.userId)
  }

  showadduser(): void{
    this.dialog.open(AdduserComponent,{width:'500px',height:'600px'});
  }
  showedituser(item:any):void{
    this.dialog.open(EdituserComponent);
  }

  onDelete(item:any ){
    Swal.fire({
      title: 'ต้องการลบข้อมูล?',
      text: "คุณต้องการลบข้อมูลใช่หรือไม่!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.loginservice.deleteById( Number (item.userId)).subscribe(res => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.ngOnInit()
        });
      }
    })
  }

  onGetId(item:any){
    this.router.navigate(['admin/getId/'+item.userId])
  }
 showdata(userId:any){
  this.loginservice.GetById(userId).subscribe((res)=>{
    res ?this.dialog.open(EdituserComponent,{data:res,width:'500px',height:'600px'}):null
  })
  
 }
 showdataId(userId:any){
  this.loginservice.GetById(userId).subscribe((res) =>{
  res ? this.admindata = res : null
  console.log("🚀 ~ file: admin.component.ts:48 ~ AdminComponent ~ showdataId ~  res:",  res)
 
  })} 

  logOut() {
    sessionStorage.removeItem('user_role');
    this.router.navigate(['home']).then(() => {
      window.location.reload()
    });
  }
  
}
