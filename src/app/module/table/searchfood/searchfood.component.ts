import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-searchfood',
  templateUrl: './searchfood.component.html',
  styleUrls: ['./searchfood.component.css']
})
export class SearchfoodComponent implements OnInit{
constructor(private activateroute:ActivatedRoute,private router:Router){}
searchTerm : String ='' 
ngOnInit(): void {
  this.activateroute.params.subscribe(params => {
    if(params.searchTerm)
    this.searchTerm = params.searchTerm;
  })
  
} 
search():void{
  if(this.searchTerm)
  this.router.navigateByUrl('/search/'+this.searchTerm);
}
}
