import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';


const API_ENDPOINT = environment.API_ENDPOINT;
const httpoption = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }

  getOrders():Observable<any>{
    return this.http.get<any>(API_ENDPOINT.concat('/orders'))
  }
  getOrdersById(ordersId:number):Observable<any>{
    return this.http.get<any>(API_ENDPOINT.concat('/orders/'+ordersId),httpoption)

  }
  SaveOders(data:any):Observable<any>{
    const body = JSON.stringify(data)
    return this.http.post<any>(API_ENDPOINT.concat('/orders'),body,httpoption)
  }
  UpdateOrders(ordersId:number,data:any):Observable<any>{
    const body = JSON.stringify(data);
    return this.http.put<any>(API_ENDPOINT.concat('/orders/'+ordersId),body,httpoption);
  }
  DeleteOrders(ordersId:number):Observable<any>{
    return this.http.delete<any>(API_ENDPOINT.concat('/orders/'+ordersId),httpoption)
  }
}
