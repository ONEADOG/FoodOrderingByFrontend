import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';

const API_ENDPOINT = environment.API_ENDPOINT;
const httpoption = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http:HttpClient) { }

  getTableAll():Observable<any>{
    return this.http.get(API_ENDPOINT.concat('/table'))
  }
  getTableById(tableId:any):Observable<any>{
    return this.http.get<any>(API_ENDPOINT.concat('/table/'+tableId),httpoption)
  }
  saveTable(data:any):Observable<any>{
    const body = JSON.stringify(data);
    return this.http.post<any>(API_ENDPOINT.concat('/table'),body,httpoption)
  }

  updateTable(tableId:any,data:any):Observable<any>{
    const body = JSON.stringify(data);
    return this.http.put<any>(API_ENDPOINT.concat('/table/'+tableId),body,httpoption)
  }

  deleteById(tableId:any):Observable<any>{
    return this.http.delete(API_ENDPOINT.concat('/table/'+tableId),httpoption)
  }

  getBytableName(tableName:any):Observable<any>{
    return this.http.get<any>(API_ENDPOINT.concat('/tablen?tableName='+tableName),httpoption)
  }
}
