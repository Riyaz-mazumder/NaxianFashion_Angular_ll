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
    this.dataservice.addToTrack(data.value).subscribe({
      next: n =>{
        console.log(n);
        const emailRequest = { email: this.trackingProduct.email, subject: "NaxianFahion Purchase in Progress ", body: " Now You Can Track Your Parcel By This ID: SL-" +  this.id};
        this.dataservice.sendEmail(emailRequest).subscribe({
          next: r=>{
            console.log(r);
            alert("The Pickup point added");
            
          },
          error: e=>{
            console.log(e);
            
          }
        })
      },
      error: e=>{
        console.log(e);
      }
    })
  }

}
