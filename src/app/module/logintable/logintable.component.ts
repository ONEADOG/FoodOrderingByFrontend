import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../Service/login.service';

import { Table } from '../Model/Table';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-logintable',
  templateUrl: './logintable.component.html',
  styleUrls: ['./logintable.component.css']
})
export class LogintableComponent implements OnInit{
constructor(private router:Router,private formbulider:FormBuilder,private loginservice:LoginService){}

formlogin = this.formbulider.group({
  tableName:''
})
  ngOnInit(): void {
      
  }
  Onsubmit(){
    const LoginDto: Table =  this.formlogin.value as unknown as Table;
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
  
        this.loginservice.Logintable(LoginDto.tableName ).subscribe((res:any) => {
          console.log(res)
          if(res){sessionStorage.removeItem('user_role');
          sessionStorage.removeItem('user_id');
          Swal.fire('success!', 'Your file has been success.', 'success');
          sessionStorage.setItem('user_role',res.tableStatus)
          // sessionStorage.setItem('user_role',res.recordStatus)
          sessionStorage.setItem('user_id',res.tableId)
  
            if(res.tableStatus==1&&2){
              sessionStorage.setItem('user_role','user')
              this.router.navigate(['table']).then(() => {
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
}
