import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { DatabaseServiceService } from 'src/app/service/database-service.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  constructor(
    private service: DatabaseServiceService,
    private authService: AuthServiceService,
    private router: Router
  ) {}


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

  message:string = "";

  formSubmit(data: NgForm) {
    console.log(data.value);
    console.log(this.allUser);

    let foundUser = this.allUser.find((e: any) => {
      return e.email === data.value.email && e.password === data.value.password;
    });


    if (foundUser) {
      this.authService.saveUser(foundUser);

      this.message = "Welcome Back ' + data.value.name + ' ! ❤️"
      this.showMessage();

      this.router.navigate(['/home']);

    } else {
      this.message = 'User Name Or Password Is InCorrect..'
      alert( 'User Name Or Password Is InCorrect..')
    }
  }

  
  showMessageFlag: boolean = false;


public  closeMessage() {
    this.showMessageFlag = false;
  }
 public showMessage() {
    this.showMessageFlag = true;
    setTimeout(() => {
      this.showMessageFlag = false;
    }, 3000);
  }
}
