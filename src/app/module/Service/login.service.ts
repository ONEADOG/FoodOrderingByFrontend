import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';

const API_ENDPOINT = environment.API_ENDPOINT;
const httpoption = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  login(username:any,password:any):Observable<Object>{
    return this.http.post(API_ENDPOINT.concat('/login/'+username+'/'+password),httpoption)
  }

  register(formdata:FormData):Observable<any>{
    return this.http.post<any>(API_ENDPOINT.concat('/addUser'),formdata)
  }

  updateuser(userId:any,formdata:FormData){
    return this.http.put<any>(API_ENDPOINT.concat('/User/'+userId),formdata)
  }

  deleteById(userId:any):Observable<any>{
    return this.http.delete<any>(API_ENDPOINT.concat('/delete/'+userId),httpoption)
  }

  GetById(userId:any):Observable<any>{
    return this.http.get<any>(API_ENDPOINT.concat('/Getuser/'+userId),httpoption)
  }

  Logintable(tableName:any){
    return this.http.post<any>(API_ENDPOINT.concat('/tablelogin/'+tableName),httpoption)
  }
}
