import { Component, OnInit,Inject } from '@angular/core';
import { LoginService } from '../../Service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  constructor(private loginservice:LoginService,private router:Router,private activaterouter:ActivatedRoute,private formbuilder:FormBuilder,@Inject(MAT_DIALOG_DATA) private data: any,){}
  
  formUser = this.formbuilder.group({
    userId:0,
    username:'',
     password:'',
     firstName:'',
     lastName:'',
     userAge:0,
     userPhone:'',
     userImage:'',
     userType:'',
     userDate:'',
     userStatus:''
  
  
  })
  userStatus:any
  userId:any
  ngOnInit(): void {
      // this.initDataForEdit(this.userId)
      if(this.data){
        this.initDataForEdit(this.data);
        this.userId = this.data.userId

      }
  }

  initDataForEdit(res:any){
    // this.loginservice.GetById(userId).subscribe((res) =>{
    //   if(res){
        console.log("🚀 ~ file: edituser.component.ts:35 ~ EdituserComponent ~ this.loginservice.GetById ~ res:", res)
        this.formUser.patchValue({
          firstName:res.firstName,
          lastName:res.lastName,
          userAge:res.userAge,
          userPhone:res.userPhone,
          userImage:res.userImage,
          userType:res.userType,
          userDate:res.userDate,
          userStatus:res.userStatus,
          username:res.username,
          password:res.password
        })
    //   }
    // })
  }
  Selectfile(event:any){
    const file = event.target.files[0];
    this.formUser.value.userImage  = file;

 }
  Onsubmit(){

    const formData = new FormData();
   if(this.formUser.value.firstName !=  null){
    formData.append('firstName',this.formUser.value.firstName as string);}else{
      formData.append('firstName',this.formUser.controls['firstName'].value as string);
    } 
    if(this.formUser.value.lastName != null){
      formData.append('lastName',this.formUser.value.lastName as any);
    }else{
      formData.append('lastName',this.formUser.controls['lastName'].value as string);
    }
    if(this.formUser.value.userAge != null){    formData.append('userAge', this.formUser.value.userAge as any);
  }else{
    formData.append('userAge', this.formUser.controls['userAge'].value as any);
  }
  if(this.formUser.value.userPhone != null){
    formData.append('userPhone', this.formUser.value.userPhone as any);

  }else{
    formData.append('userPhone', this.formUser.controls['userPhone'].value as any);
  }
  if(this.formUser.value.userImage != null){
    formData.append('file', this.formUser.value.userImage as any);
  }
    if(this.formUser.value.username != null){    formData.append('username', this.formUser.value.username as any);
  }else{
    formData.append('username', this.formUser.controls['username'].value as any);

  }
  if(this.formUser.value.password != null){
    formData.append('password', this.formUser.value.lastName as any);

  }else{
    formData.append('password', this.formUser.controls['password'].value as any);

  }
  if(this.formUser.value.userType != null){
    formData.append('userType', this.formUser.value.userType as any);

  }else{
    formData.append('userType', this.formUser.controls['userType'].value as any);

  }
  if(this.formUser.value.userStatus != null){
    formData.append('userStatus',this.formUser.value.userStatus as any);

  }else{
    formData.append('userStatus',this.formUser.controls['userStatus'].value as any);

  }
    new Response(formData).text().then(console.log)
    Swal.fire({
      title: 'ต้องการเพิ่มผู้ใช้งาน?',
      text: "คุณต้องการเพิ่มผู้ใช้งานใช่หรือไม่?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#56C596' ,
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก' 
    }).then((result) => {
      if (result.isConfirmed) {
        this.loginservice.updateuser(this.userId,formData).subscribe(res => {
          Swal.fire(
            'Sucess',
            'Your file has been Compelete.',
            'success'
          )
          window.location.reload()
        //  this.router.navigate(['admin/main'])
        });

      }
    })
  }
}
