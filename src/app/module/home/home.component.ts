import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../Service/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Login } from '../Model/Login';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
constructor(private dialog:MatDialog,private loginservice:LoginService,private formbuilder:FormBuilder,private router:Router){}
 
loginform = this.formbuilder.group({
  username:['',Validators.required],
  password:['',Validators.required]
})  
openDialog(): void {
    this.dialog.open(LoginComponent);
}
Onsubmit(){
  const LoginDto: Login =  this.loginform.value as unknown as Login;
  Swal.fire({
    title: 'ต้องการเข้าสู่ระบบ?',
    text: 'คุณต้องการเข้าสู่ระบบใช่หรือไม่!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, we it!',
  }).then((result) => {
    if (result.isConfirmed) {
      sessionStorage.removeItem('user_role')

      this.loginservice.login(LoginDto.username , LoginDto.password).subscribe((res:any) => {
        console.log(res)
        if(res){sessionStorage.removeItem('user_role');
        sessionStorage.removeItem('user_id');
        Swal.fire('success!', 'Your file has been success.', 'success');
        sessionStorage.setItem('user_role',res.roleId)
        // sessionStorage.setItem('user_role',res.recordStatus)
        sessionStorage.setItem('user_id',res.userId)

          if(res.roleid==2){
            sessionStorage.setItem('user_role','user')
            this.router.navigate(['user']).then(() => {
            window.location.reload()
            });
          }else if(res.roleid==1 ){
            sessionStorage.setItem('user_role','admin')
            this.router.navigate(['admin']).then(() => {
              window.location.reload()
            });
          }else if(res.roleid==3 ){
            sessionStorage.setItem('user_role','user2')
            this.router.navigate(['user-k']).then(() => {
              window.location.reload()
            });
          }
        }else{
          Swal.fire('ไม่สามารถเข้าสู่ระบบได้!', 'Your file has been success.', 'warning');

        } 



        this.ngOnInit();
      });
    }
  });
}
ngOnInit(): void {
    
}
}
