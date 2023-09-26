import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
const API_ENDPOINT = environment.API_ENDPOINT;
const httpoption = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  
  getAll():Observable<any>{
    return this.http.get<any>(API_ENDPOINT.concat('/order'),httpoption)
  }
  getById(orderId:any):Observable<any>{
    return this.http.get<any>(API_ENDPOINT.concat('/order/'+orderId),httpoption)
  }
  SaveOrder(data:any):Observable<any>{
    const body = JSON.stringify(data);
    return this.http.post<any>(API_ENDPOINT.concat('/order'),body,httpoption)

  }
  UpdateOrder(orderId:any,data:any){
    const body = JSON.stringify(data)
    return this.http.put<any>(API_ENDPOINT.concat('/order/'+orderId),body,httpoption)
  }
  DeleteById(orderId:any){
    return this.http.delete<any>(API_ENDPOINT.concat('/order/'+orderId),httpoption)
  }
  getByTable(tableName:any):Observable<any>{
    return this.http.get(API_ENDPOINT.concat('/getorder/?tableName='+tableName),httpoption)
  }
  getByordersId(ordersId:any):Observable<any>{
    return this.http.get<any>(API_ENDPOINT.concat('/getorder/'+ordersId),httpoption)
  }
}
