import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';

const API_ENDPOINT = environment.API_ENDPOINT;
const httpoption = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
const httpoptionqr = { Headers, responseType: 'text' as 'json' };
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

 GetAll():Observable<any>{
  return this.http.get<any>(API_ENDPOINT.concat('/Payment'))
 }
 GetPaymentById(paymentId:any):Observable<any>{
  return this.http.get<any>(API_ENDPOINT.concat('/Payment/'+paymentId),httpoption)
 }
 AddPayment(formdata:FormData):Observable<any>{
  return this.http.post<any>(API_ENDPOINT.concat('/Payment'),formdata)
 }
 UpdatePayment(paymentId:number,formdata:FormData):Observable<any>{
  return this.http.put<any>(API_ENDPOINT.concat('/Payment/'+paymentId),formdata,httpoption)
 }
 DeleteById(paymentId:number):Observable<any>{
  return this.http.delete<any>(API_ENDPOINT.concat('/Payment/'+paymentId),httpoption)
 }
 getQrcode(amount:any):Observable<any>{
  return this.http.get<any>(API_ENDPOINT.concat('/generate-to-base64?amount='+amount,),httpoptionqr)
 }
 getByTableName(tableName:any):Observable<any>{
  return this.http.get<any>(API_ENDPOINT.concat('/Paymentt/?tableName='+tableName),httpoption)
 }
getPaymentByOrdersId(ordersId:any):Observable<any>{
return this.http.get<any>(API_ENDPOINT.concat('/Payments/'+ordersId),httpoption)
}
}
