import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseServiceService } from 'src/app/service/database-service.service';

@Component({
  selector: 'app-trakc-by-admin',
  templateUrl: './trakc-by-admin.component.html',
  styleUrls: ['./trakc-by-admin.component.scss']
})
export class TrakcByAdminComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataservice: DatabaseServiceService,

  ){}

   id!: number;
   orderDetails!: any;
 
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.dataservice.getTheOrder(this.id).subscribe({
      next: r=>{
        this.orderDetails = r;
      },
      error: e =>{
        console.log(e);
        
      }
    })
  }

onThirdParty(){
 
 this.dataservice.deleteOrder(this.id).subscribe({
  next: n=>{
    console.log(n);
    
  },
  error: e=>{
    console.log(e);  
  }
 });
 alert("Order Has Been Proced")
 this.router.navigate(["/admin/dashbord/approveOrders"]);
}

onOwnService(){
  this.router.navigate(["/admin/dashbord/trackingDetails/" + this.id]);
}


}
