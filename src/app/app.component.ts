import { Component, ElementRef, ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild ('searchInput' , {static:false}) searchInputRef: ElementRef;
  constructor ( private http: HttpClient) {} 
  totalItems: number =0;
  noResult =false;
  volumes =[];
  onSearch () {
  const search = this.searchInputRef.nativeElement.value;
  if (search) {
  this.http.get (`https://www.googleapis.com/books/v1/volumes?q=intitle:${search}`)
  .pipe(map (responseData => {
   const postsArray =[];
   this.noResult=false;
   this.totalItems= responseData["totalItems"]
   for (const key in responseData["items"]) {
     postsArray.push({...responseData['items'][key], id: key})
   }
   if (this.totalItems === 0) {
     this.noResult= true;
   }
   return postsArray;
  }))
  .subscribe (data =>
  {
      this.volumes= data;      
  });
}
  
  else {
    alert ("please enter a value");
  }
}
}
