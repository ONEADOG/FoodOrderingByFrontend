import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableService } from '../../Service/table.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-addtable',
  templateUrl: './addtable.component.html',
  styleUrls: ['./addtable.component.css']
})
export class AddtableComponent implements OnInit{
  constructor( private router:Router,private tableservice:TableService,private formBuiler:FormBuilder){}
  
  formTable = this.formBuiler.group({
    tableId:0,
    tableName:'',
    ordersId:0,
    tableStatus:0,
    })

  ngOnInit(): void {
    
}
Onsubmit(){
  const TableDto = this.formTable.value;
  TableDto.tableStatus= 1
  TableDto.ordersId = 0 
   Swal.fire({
    title: 'ต้องการเพิ่มโต๊ะ?',
    text: "คุณต้องการเพิ่มโต๊ะใช่หรือไม่?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#56C596' ,
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก' 
  }).then((result) => {
    if (result.isConfirmed) {
      this.tableservice.saveTable(TableDto).subscribe(res => {
        Swal.fire(
          'Sucess',
          'Your file has been Compelete.',
          'success'
        )
       //  window.location.reload()
       this.router.navigate(['user'])
      });

    }
  })
}

}
