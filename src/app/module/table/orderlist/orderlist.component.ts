import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Service/login.service';
import { OrderService } from '../../Service/order.service';
import { Table } from '../../Model/Table';
import { TableService } from '../../Service/table.service';
import { Order } from '../../Model/Order';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit{
  constructor(private loginservice:LoginService,private orderservice:OrderService,private tableservice:TableService){}
  tableId:any
  tabledata!:Table
  order:any
  ngOnInit(): void {
    this.tableId = sessionStorage.getItem('user_id')
    console.log("🚀 ~ file: table.component.ts:37 ~ TableComponent ~ ngOnInit ~ this.tableId:", this.tableId)
    this.showdatatable(this.tableId)
    console.log("🚀 ~ file: table.component.ts:42 ~ TableComponent ~ ngOnInit ~ this.tableId:", this.tableId)
  
  }
  showdatatable(tableId:any){
    this.tableservice.getTableById(tableId).subscribe((res)=>{
      res ? this.tabledata = res : null
      console.log("🚀 ~ file: table.component.ts:65 ~ TableComponent ~ this.tableservice.getTableById ~ res:", res)
    this.getOrderByTable(this.tabledata.tableName)
    console.log("🚀 ~ file: orderlist.component.ts:30 ~ OrderlistComponent ~ this.tableservice.getTableById ~ this.tabledata.tableName:", this.tabledata.tableName)
    }
    
    )
  } 
  getOrderByTable(tableName:string){
    this.orderservice.getByTable(tableName).subscribe((res) =>{
      res ? this.order = res :null
    })
  }
}
