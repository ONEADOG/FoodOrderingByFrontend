
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';

const API_ENDPOINT = environment.API_ENDPOINT;
const httpoption = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(private http:HttpClient) { }

  getTotalprice():Observable<number>{
    return this.http.get<number>(API_ENDPOINT.concat('/gettotal'))
  }
  getTotalGuest():Observable<number>{
    return this.http.get<number>(API_ENDPOINT.concat('/gettotalguest'))
  }

}
