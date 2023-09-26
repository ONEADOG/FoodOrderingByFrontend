import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Service/login.service';
import { TableService } from '../../Service/table.service';
import { MatDialog } from '@angular/material/dialog';
import { AddfoodComponent } from '../addfood/addfood.component';
import { FoodService } from '../../Service/food.service';

import { FormBuilder } from '@angular/forms';
import { Food } from '../../Model/Food';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-managemenu',
  templateUrl: './managemenu.component.html',
  styleUrls: ['./managemenu.component.css']
})
export class ManagemenuComponent {

  constructor(private router:Router,private loginservice:LoginService,private tableservice:TableService,private dialog:MatDialog,private foodservice:FoodService,private formbulider:FormBuilder){}
 listfood:any
 food:any
 foodId:any
  ngOnInit(): void {
      this.listfood = this.foodservice.getAllFood().subscribe(res =>{
        res ? this.listfood = res : null
        console.log("🚀 ~ file: managemenu.component.ts:22 ~ ManagemenuComponent ~ this.listfood=this.foodservice.getAllFood ~ res:", res)
      })
  }
  formfood = this.formbulider.group({
    foodId:0,
    foodName:'',
    foodQty:'',
    foodType:'',
    foodImage:'',
    promotion:0,
    foodStatus:0,
  })
  showaddfood(){
    this.dialog.open(AddfoodComponent)
  }

  logOut() {
    sessionStorage.removeItem('user_role');
    this.router.navigate(['home']).then(() => {
      window.location.reload()
    });
  }
  onDelete(food:any ){
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
        this.foodservice.daleteFood( Number (food.foodId)).subscribe(res => {
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
  onGetId(food:any){
    // this.router.navigate(['user/getId/'+table.tableId])
    this.food = food
  }
  UpdateTableStatus(newStatus:number) {
  
    if (this.food){
      const updateStatus:Food = {...this.food,foodStatus:newStatus};
   const formData = new FormData();
   formData.append('foodStatus',this.formfood.value.foodStatus = newStatus as any)
        Swal.fire({ title: 'ต้องการเริ่มปรับสถานะใช่หรือไม่?',
        text: "คุณต้องการปรับสถานะใช่หรือไม่?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#56C596' ,
          cancelButtonColor: '#d33',
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก' }).then((result) =>{
           if(result.isConfirmed){
            
            // formData.append('foodStatus',this as any)
            this.foodservice.updateFood(this.food.foodId,formData).subscribe(res => {
              Swal.fire( 'Sucess',
              'Your file has been Compelete.',
              'success');
              // window.location.reload();
            });
           }else{
            Swal.fire('ไม่สามารถอัพเดตได้โปรดลองใหม่อีกครั้ง')
           }
          })
      
    }
  }
}
