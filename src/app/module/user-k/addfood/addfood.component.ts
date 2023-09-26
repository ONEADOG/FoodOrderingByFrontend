import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodService } from '../../Service/food.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-addfood',
  templateUrl: './addfood.component.html',
  styleUrls: ['./addfood.component.css']
})
export class AddfoodComponent implements OnInit{
constructor(private router:Router,private formbulider:FormBuilder,private foodservice:FoodService){}
listfoodtype:any
imgUrl:string=''
formfood = this.formbulider.group({
  foodId:0,
  foodName:'',
  foodQty:'',
  foodType:'',
  foodImage:'',
  promotion:0,
  foodStatus:0,
})
ngOnInit(): void {
  this.listfoodtype =  this.foodservice.getFoodType().subscribe(res =>{
    res ? this.listfoodtype = res : null
    console.log("🚀 ~ file: addfood.component.ts:27 ~ AddfoodComponent ~ this.listfoodtype=this.foodservice.getFoodType ~ res:", res)
  })
}

Selectfile(event:any){
  const file = event.target.files[0];
  this.formfood.value.foodImage  = file;

}

Onsubmit(){
  const formData = new FormData();
 
  formData.append('foodName',this.formfood.value.foodName as any);
  formData.append('foodQty',this.formfood.value.foodQty as any);
  formData.append('foodType', this.formfood.value.foodType as any);
  formData.append('file', this.formfood.value.foodImage as any);
  formData.append('promotion', this.formfood.value. promotion as any);
  // formData.append('foodStatus', this.formfood.value.foodStatus as any);
  new Response(formData).text().then(console.log)
  Swal.fire({
    title: 'ต้องการเพิ่มรายการอาหาร?',
    text: "คุณต้องการรายการอาหารใช่หรือไม่?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#56C596' ,
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก' 
  }).then((result) => {
    if (result.isConfirmed) {
      this.foodservice.addFood(formData).subscribe(res => {
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
