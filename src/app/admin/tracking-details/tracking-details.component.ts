import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseServiceService } from 'src/app/service/database-service.service';

@Component({
  selector: 'app-tracking-details',
  templateUrl: './tracking-details.component.html',
  styleUrls: ['./tracking-details.component.scss']
})
export class TrackingDetailsComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataservice: DatabaseServiceService,

  ){}

  id!: number;
  trackingProduct!: any;

  ngOnInit(): void {
     this.id = this.route.snapshot.params['id'];
    this.dataservice.getTheOrder(this.id).subscribe({
      next: r=>{
        this.trackingProduct = r;
      },
      error: e =>{
        console.log(e);
        
      }
    })
  }

  submit(data:NgForm){
    data.value.trackingNum =  "SL-" + this.trackingProduct.id;

    console.log(data.value);

    const emailRequest = { to: this.trackingProduct.email, subject: "NaxianFahion Purchase in Progress ", body: " Now You Can Track Your Parcel By This ID: SL-" +  this.id};
    
    console.log(emailRequest);
    
    this.dataservice.sendEmail(emailRequest).subscribe({
      next: r=>{
        console.log(r);
        alert("The Pickup point added");
        
      },
      error: e=>{
        console.log(e);
        
      }
    })
    if(data.value.inTransit){
      localStorage.setItem("inTransit", data.value.inTransit);
    }if( data.value.pickedUp){
      localStorage.setItem("pickedUp", data.value.pickedUp);
    }if(data.value.outForDelivery){
      localStorage.setItem("outForDelivery", data.value.outForDelivery);
    }if(data.value.delivered){
      localStorage.setItem("delivered", data.value.delivered);
    }
   
  //   this.dataservice.addToTrack(data.value).subscribe({
  //     next: n =>{
  //       console.log(n);
  //       console.log(n);
  //       alert("The Pickup point added");
       
  //     },
  //     error: e=>{
  //       console.log(e);
  //     }
  //   })
   }

}
