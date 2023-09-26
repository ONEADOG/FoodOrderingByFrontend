import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableService } from '../../Service/table.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edittable',
  templateUrl: './edittable.component.html',
  styleUrls: ['./edittable.component.css']
})
export class EdittableComponent implements OnInit{

  constructor( private router:Router,private tableservice:TableService,private formBuiler:FormBuilder,private activaterouter:ActivatedRoute){}
  formtable = this.formBuiler.group({
  tableId:0,
tableName:'',	
guestQty:0,
promotion:0,
tableStatus:0
  }) 

  ngOnInit(): void {
    this.tableId = this.activaterouter.snapshot.paramMap.get("tableId");
    this.initdataedit(this.tableId)
}
tableId:any
tableStatus:any
initdataedit(tableId:any){
  this.tableservice.getTableById(tableId).subscribe((res) =>{
    res ? this.formtable.patchValue({
      tableName:res.tableName,	
      guestQty:res.guestQty,
      promotion:res.promotion,
      tableStatus:res.tableStatus,
    }) : 
    console.log("🚀 ~ file: edittable.component.ts:33 ~ EdittableComponent ~ this.tableservice.getTableById ~ res:", res)
  })
}
// onGetId(table:any){
//   this.router.navigate(['user/getId/'+table.tableId])
// }

Onsubmit(){
  const TableDto = this.formtable.value;
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
      this.tableservice.updateTable(TableDto.tableId,TableDto).subscribe(res => {
        Swal.fire(
          'Sucess',
          'Your file has been Compelete.',
          'success'
        )
       //  window.location.reload()
       this.router.navigate(['user'])
      });

    }
  })}
}
