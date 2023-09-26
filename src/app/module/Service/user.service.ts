import { Injectable } from '@angular/core';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const API_ENDPOINT = environment.API_ENDPOINT;
const httpoption = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  GetAllUser():Observable<any>{
    return this.http.get<any>(API_ENDPOINT.concat('/Getuser'))
  }
  GetById(userId:any):Observable<any>{
    return this.http.get<any>(API_ENDPOINT.concat('/Get/'+userId),httpoption)
  }

}
