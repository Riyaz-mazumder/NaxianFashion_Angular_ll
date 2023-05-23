import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { ShareDataService } from 'src/app/service/share-data.service';
import { WishListServiceService } from 'src/app/service/wish-list-service.service';

@Component({
  selector: 'app-wish-list-page',
  templateUrl: './wish-list-page.component.html',
  styleUrls: ['./wish-list-page.component.scss'],
})
export class WishListPageComponent implements OnInit {
  loggedIn!: any;
  constructor(
    private service: WishListServiceService,
    private cartService: CartServiceService,
    private wishListService: WishListServiceService,
    private authService: AuthServiceService,
    private sharedService: ShareDataService,
    private router: Router,
    private dialog: MatDialog,
  ) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.dialog.closeAll(); // Close all open dialogs when navigation starts
      }
    });
  }
 
   WishListProductRemove(id: number) {

    this.loggedIn = this.authService.getUser();
    if(this.loggedIn === null){

      this.wishListService.removeWishListItemFromLocalStorage(id.toString());
        this.ngOnInit();
        this.sharedService.triggerOnInit();
        this.message = "Removed From WishList"
        this.showMessage();

    }else{
    // cardProductRemoveQuery;
    this.service.removeFromWishList(id).subscribe({
      next: (r) => {
        this.ngOnInit();
        this.sharedService.triggerOnInit();
        this.message = "Removed From WishList"
        this.showMessage();
        
      },
      error: (e) => {
        alert(e);
      },
    });
  }
  }

  dataObj!: any;
  WishListToCart(data: any, id: number) {
    console.log(data);
    data.id = null;
    data.quantity = 1;
    // add To Cart
    this.cartService.addToCart(this.dataObj).subscribe({
      next: (r) => {
        this.service.removeFromWishList(id).subscribe({
          next: (r) => {
            alert('Added To Your Cart');
            this.ngOnInit();
          },
          error: (e) => {
            console.log(e);
          },
        });
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  Products!: any;


  ngOnInit(): void {

    this.loggedIn = this.authService.getUser();
    if(this.loggedIn === null){
         this.Products = this.cartService.getAllWishListItemsFromLocalStroage();
    }else{

      this.service.getAllWishList().subscribe({
        next: (r) => {
          this.Products = r;
        },
        error: (e) => {
          alert(e);
        },
      });
      
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
