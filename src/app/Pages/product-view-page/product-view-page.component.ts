import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckOutPageComponent } from 'src/app/common/check-out-page/check-out-page.component';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { DatabaseServiceService } from 'src/app/service/database-service.service';
import { WishListServiceService } from 'src/app/service/wish-list-service.service';

@Component({
  selector: 'app-product-view-page',
  templateUrl: './product-view-page.component.html',
  styleUrls: ['./product-view-page.component.scss'],
})
export class ProductViewPageComponent implements OnInit {
  constructor(
    private service: DatabaseServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthServiceService,
    private cartService: CartServiceService,
    private wishListService: WishListServiceService,
  ) {}

  productIndividual!: any;
  id: any;
  loggedIn!: any;
  ngOnInit() {
    this.loggedIn = this.authService.getUser();
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
    
  }

  gotToTryOnGlesses(id: any, name: string) {
    let tryOnGlassLink: string;
  
    switch (name) {
      case "Ray-Ban Cockpit Sunglasses RB3362 001-56 - Arista":
        tryOnGlassLink = "https://jeeliz.com/sunglasses/?sku=rayban_cockpit_or_vert_classique";
        break;
      case "Ray Ban RB3025 Aviator Gold/ Green":
        tryOnGlassLink = "https://jeeliz.com/sunglasses/?sku=carrera_119S_havana_blue";
        break;
      case "Ray-Ban RB3574N BLAZE ROUND":
        tryOnGlassLink = "https://jeeliz.com/sunglasses/?sku=blaze_round_noir_grisdegrade";
        break;
      default:
        tryOnGlassLink = "https://jeeliz.com/sunglasses/?sku=rayban_cockpit_or_vert_classique";
        break;
    }
  
    this.authService.setThetryOnGlassLink(tryOnGlassLink);
    console.log(this.authService);
    
    this.router.navigate(["/tryOn/glessId/" + id]);
  }

    // Shopping Card Clicked
    shopping(f: string, obj: any) {
      // obj.id = null;
      obj.quantity = 1;
  
      if (this.loggedIn === null) {
        
      if (f === 'formWishList') {
          console.log('Clicked');
          this.message = "Added To Your WishList";
          localStorage.setItem("formWishList_" + obj.id.toString(), JSON.stringify(obj));
  
          this.showMessage();
          
          
        } else if (f === 'formCard') {
          this.message = "Added To Your Cart";
          localStorage.setItem("formCard_" + obj.id.toString(), JSON.stringify(obj));
          this.showMessage()
  
        }
        
      } else {
        if (f === 'formWishList') {
          console.log('Clicked');
  
          this.wishListService.addToWishList(obj).subscribe({
            next: (r) => {
              alert('Added To Your Wishlist');
              this.ngOnInit();
            },
            error: (e) => {
              alert(e);
            },
          });
        } else if (f === 'formCard') {
          this.cartService.addToCart(obj).subscribe({
            next: (r) => {
              alert('Added To Your Cart');
              this.ngOnInit();
            },
            error: (e) => {
              alert(e);
            },
          });
          console.log('Clicked');
        }
      }
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
