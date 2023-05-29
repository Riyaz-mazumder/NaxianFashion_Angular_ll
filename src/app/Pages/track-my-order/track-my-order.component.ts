import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-my-order',
  templateUrl: './track-my-order.component.html',
  styleUrls: ['./track-my-order.component.scss']
})
export class TrackMyOrderComponent {


  constructor(private router: Router){}

  
  searchProducts(d:NgForm){
    if(d.value.search === 'SL-1'){
      this.router.navigate(["/trackOrder/details/1"])
    }else{
      alert("Wrong Traking Id")
    }
  }
}
