
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';

const API_ENDPOINT = environment.API_ENDPOINT;
const httpoption = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient) { }

  getReviewAll():Observable<any>{
    return this.http.get<any>(API_ENDPOINT.concat('/review'));
  }
  getReviewById(reviewId:any):Observable<any>{
    return this.http.get<any>(API_ENDPOINT.concat('/review/'+reviewId),httpoption)
  }
  saveReview(data:any):Observable<any>{
    const body = JSON.stringify(data)
    return this.http.post<any>(API_ENDPOINT.concat('/review'),body,httpoption)
  }
  UpdateReview(reviewId:any,data:any):Observable<any>{
    const body = JSON.stringify(data)
    return this.http.put<any>(API_ENDPOINT.concat('/review/'+reviewId),body,httpoption)
  }
  DeleteReview(reviewId:any):Observable<any>{
    return this.http.delete<any>(API_ENDPOINT.concat('/review'+reviewId),httpoption)
  }
}
