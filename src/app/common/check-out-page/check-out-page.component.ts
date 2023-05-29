import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { DatabaseServiceService } from 'src/app/service/database-service.service';
import { EmailServiceService } from 'src/app/service/email-service.service';

@Component({
  selector: 'app-check-out-page',
  templateUrl: './check-out-page.component.html',
  styleUrls: ['./check-out-page.component.scss'],
})
export class CheckOutPageComponent implements OnInit {
  amountToPay = 0;
  oneData!: any;
  theUser!: any;
  theUserId!: any;
  constructor(
    private authService: AuthServiceService,
    private service: DatabaseServiceService,
    private activeRouter: ActivatedRoute,
    private emailService: EmailServiceService,
    private router: Router,
    private dialogRef: MatDialogRef<CheckOutPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.oneData = data;
  }

  ngOnInit() {
    this.theUser = this.authService.getUser();
    console.log(this.oneData);
    this.theUserId = JSON.parse(this.theUser);
  }

  submit(data: NgForm) {
    //  first setting the id value null

    const arr =  "Product Id: " + this.oneData.id + " Quantity: " + this.oneData.quantity + " color: " +this.oneData.color + " size: " + this.oneData.size;

    data.value.products = arr;
    data.value.customerId = this.authService.getUserId();
    data.value.isActive = true;
    data.value.isApproved = false;
    console.log(data.value);

    this.service.addOrder(data.value).subscribe({
      next: (r) => {
      alert("Your Order Has Been Submitted. Tanks For Shopping With Us. ❤️");
        data.reset();
        const emailRequest = { email: data.value.email, subject: "NaxianFahion Purchase", body: "Hey" +  data.value.firstName + 
        "Thanks For your Order, Your Order in Process, We Will Get Back To You Soon. -Naxian Fashion Team"};
        this.emailService.sendEmail(emailRequest).subscribe({
          next: n=>{
            console.log(n);
            
            
          },
          error: e=>{
              console.log(e);
              
          }
        });
        this.router.navigate(['/home']);
      },
      error: (e) => {
        // console.log(e);
        // alert('Something Went Wrong Try Again');
      },
    });
    this.dialogRef.close();
  }

  
  showMessageFlag: boolean = false;

public  message: string = "";

 public closeMessage() {
    this.showMessageFlag = false;
  }
public showMessage() {
    this.showMessageFlag = true;
    setTimeout(() => {
      this.showMessageFlag = false;
    }, 3000);
  }
}
