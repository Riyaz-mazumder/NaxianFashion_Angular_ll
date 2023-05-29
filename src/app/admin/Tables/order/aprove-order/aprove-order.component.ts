import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseServiceService } from 'src/app/service/database-service.service';

@Component({
  selector: 'app-aprove-order',
  templateUrl: './aprove-order.component.html',
  styleUrls: ['./aprove-order.component.scss'],
})
export class AproveOrderComponent implements OnInit {
  constructor(
    private service: DatabaseServiceService,
    private router: Router,
    ) {}
  allProducts!: any;

  ngOnInit(): void {
    
    this.service.getAllUnApprovedOrders().subscribe({
      next: (r) => {
        this.allProducts = r;
      },
      error: (err) => {
        console.log(err);
      },
    });
    console.log(this.allProducts);
  }

  onApprove(obj: any) {
    
    this.router.navigate(['/admin/dashbord/approveOrder/tracking/' + obj.id])
  }
  onDenied(obj: any) {
    alert('The Order Has been Denied...');
  }
}
