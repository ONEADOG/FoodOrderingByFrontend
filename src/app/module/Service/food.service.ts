import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { Food } from '../Model/Food';
import { map } from 'rxjs/operators';
const API_ENDPOINT = environment.API_ENDPOINT;
const httpoption = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }
  getAllFood(){
    return this.http.get<any>(API_ENDPOINT.concat('/Food'))
  }
  getFoodById(foodId:any){
    return this.http.get(API_ENDPOINT.concat('/Food/'+foodId),httpoption)
  }
  addFood(fromdata:any){ 
    return this.http.post<any>(API_ENDPOINT.concat('/Food'),fromdata)
  }
  updateFood(foodId:any,fromdata:any){
    return this.http.put<any>(API_ENDPOINT.concat('/Food/'+foodId),fromdata)
  }
  daleteFood(foodId:any){
    return this.http.delete<any>(API_ENDPOINT.concat('/Food/'+foodId),httpoption)
  }

  getFoodBySearchTerm(searchTerm:any):Observable<any>{
    return this.getAllFood().pipe(
      map((foods: any[]) =>
        foods.filter((food: any) =>
          food.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ));
  }

  getFoodType():Observable<any>{
    return this.http.get<any>(API_ENDPOINT.concat('/foodtype'))
  }
  getFoodTypeById(typeId:any):Observable<any>{
    return this.http.get<any>(API_ENDPOINT.concat('/foodtype/'+typeId),httpoption)
  }
  saveFoodType(data:any):Observable<any>{
    const body = JSON.stringify(data);
    return this.http.post<any>(API_ENDPOINT.concat('/foodType'),body,httpoption)
  }
  Update(typeId:number,data:any):Observable<any>{
    const body = JSON.stringify(data);
    return this.http.put<any>(API_ENDPOINT.concat('/foodtype/'+typeId),body,httpoption)
  }
  DeleteById(typeId:number):Observable<any>{
    return this.http.delete<any>(API_ENDPOINT.concat('/foodtype/'+typeId),httpoption)
  }
  Randomfood():Observable<any>{
    return this.http.get<any>(API_ENDPOINT.concat('/random'))
  }
}
