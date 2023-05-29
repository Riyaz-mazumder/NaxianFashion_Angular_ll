import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-track-my-order-details',
  templateUrl: './track-my-order-details.component.html',
  styleUrls: ['./track-my-order-details.component.scss']
})
export class TrackMyOrderDetailsComponent implements OnInit{

  id!: any;

  pickedUp!: string | null;
  inTransit!: string | null;
  outForDelivery!: string | null;
  delivered!: string | null;

  
  ngOnInit(): void {
    this.pickedUp = localStorage.getItem("pickedUp");
    this.inTransit = localStorage.getItem("inTransit");
    this.outForDelivery = localStorage.getItem("outForDelivery");
    this.delivered = localStorage.getItem("delivered");
    console.log(this.pickedUp +"   -----------------");
    
  }

}
