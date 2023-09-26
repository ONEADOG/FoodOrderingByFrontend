import { Component,OnInit } from '@angular/core';
import { LoginService } from '../../Service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
constructor(private loginService:LoginService,private router:Router,private activatedroute:ActivatedRoute,private formbuilder:FormBuilder){}



formUser = this.formbuilder.group({
  username:'',
	 password:'',
	 firstName:'',
	lastName:'',
	userAge:0,
	userPhone:'',
	userImage:'',
	userType:'',


})
  ngOnInit(): void {
      
  }
  Selectfile(event:any){
    const file = event.target.files[0];
    this.formUser.value.userImage  = file;

 }
  Onsubmit(){
    const formData = new FormData();
    formData.append('firstName',this.formUser.value.firstName as any);
    formData.append('lastName',this.formUser.value.lastName as any);
    formData.append('userAge', this.formUser.value.userAge as any);
    formData.append('userPhone', this.formUser.value.userPhone as any);
    formData.append('file', this.formUser.value.userImage as any);
    formData.append('username', this.formUser.value.username as any);
    formData.append('password', this.formUser.value.lastName as any);
    formData.append('userType', this.formUser.value.userType as any);
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
        this.loginService.register(formData).subscribe(res => {
          Swal.fire(
            'Sucess',
            'Your file has been Compelete.',
            'success'
          )
         //  window.location.reload()
         this.router.navigate(['admin/main'])
        });

      }
    })
  }
}
