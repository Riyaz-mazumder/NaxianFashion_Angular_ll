import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseServiceService } from 'src/app/service/database-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit{

  constructor(
    private service: DatabaseServiceService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  f: NgForm | undefined;

  
  allUser!: any;
  ngOnInit(): void {
    this.service.getAllUsers().subscribe({
      next: (r) => {
        this.allUser = r;
      },
      error: (err) => {
        alert(err);
      },
    });
  }



  submit(d: NgForm) {

    let foundUserEmail = this.allUser.find((e: any) => {
      return e.email === d.value.email;
    });

   

    if(foundUserEmail){
      alert("This Email is Alredy Uded")
    }else{

      if(d.value.password.length <6){
        alert("Password must be 6 characters long or more")
      }else{
    
    if(d.valid){
    d.value.card=[]
    this.service.addUser(d.value).subscribe({
      next: (r) => {
        d.reset();
        this.showMessage();
        this.router.navigate(['/login']);
      },
      error: (e) => {
        alert(e);
      },
    });
    }else{
      alert("Please Fill The Full Form")
    }
  }

  }
   
  }

  showMessageFlag: boolean = false;


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
