import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseServiceService } from 'src/app/service/database-service.service';

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CheckOutPageComponent } from 'src/app/common/check-out-page/check-out-page.component';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}
  transform(url: string) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 

@Component({
  selector: 'app-try-on-sunglass',
  templateUrl: './try-on-sunglass.component.html',
  styleUrls: ['./try-on-sunglass.component.scss']
})
export class TryOnSunglassComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DatabaseServiceService,
    private authservice: AuthServiceService,
    private dialog: MatDialog,
  ){}
  url: string = '';
  id!: number;
  productIndividual!: any;

  ngOnInit() {
   this.url = this.authservice.getThetryOnGlassLink();
   
   if(this.authservice.getThetryOnGlassLink() === null || this.authservice.getThetryOnGlassLink() === ""){
    //Set the dynamic value for the iframe src
    this.url = 'https://jeeliz.com/sunglasses/?sku=rayban_cockpit_or_vert_classique';
    }

    this.id = this.route.snapshot.params['id'];
    this.service.getProductById(this.id).subscribe({
      next: (r) => {
        this.productIndividual = r;
        console.log(this.productIndividual);
      },
      error: (err) => {
        alert(err);
        console.log(err);
      },
    });
  }

  redirectToBuyPage() {
   
    const dialogRef = this.dialog.open(CheckOutPageComponent, {
      data: this.productIndividual,
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
  
}

}
