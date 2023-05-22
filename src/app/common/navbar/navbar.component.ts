import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { DatabaseServiceService } from 'src/app/service/database-service.service';
import { ShoptinCartComponent } from '../shoptin-cart/shoptin-cart.component';
import { WishListPageComponent } from '../wish-list-page/wish-list-page.component';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { WishListServiceService } from 'src/app/service/wish-list-service.service';
import { NgForm } from '@angular/forms';
import { SearchSearviceService } from 'src/app/service/search-searvice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthServiceService,
    private service: DatabaseServiceService,
    private dialog: MatDialog,
    private cartService: CartServiceService,
    private wishListService: WishListServiceService,
    private searchService: SearchSearviceService,
    private router: Router
  ) {}

  searchedProducts!:any;
  searchProducts(d:NgForm){
    console.log(d.value.search);
    this.router.navigate(['/search/' + d.value.search]);
    
  }

  loggedIn!: any;
  userName!: any;
  cartItems = 0;
  wishListItems = 0;
  theUser!: any;
  products!: any;
  wishListProducts!: any;
  ngOnInit(): void {
    console.log(this.authService.getUser());
    this.loggedIn = this.authService.getUser();
    
    // this.userName = JSON.parse(this.loggedIn).name;

    if(this.loggedIn === null){

      console.log(this.cartService.getAllCartItemsFromLocalStroage());

      this.products = this.cartService.getAllCartItemsFromLocalStroage();
      this.cartItems = this.cartService.getAllCartItemsFromLocalStroageLength();

      this.wishListProducts = this.cartService.getAllWishListItemsFromLocalStroage();
      this.wishListItems = this.cartService.getAllWishListItemsLength();   
      
    }else{

      this.cartService.addToCart(this.cartService.getAllCartItemsFromLocalStroage).subscribe({
      next(value) {
        console.log(value);
        for (var key in localStorage) {
          if (key.includes("formCard_")) {
            localStorage.removeItem(key);
          }
        }    
      },error(err) {
        console.log(err);
        
      },
      })

    this.cartService.getAllFromCart().subscribe({
      next: (r) => {
        this.products = r;
        this.cartItems = this.cartService.getAllCartItemsFromLocalStroageLength();
      },
      error: (e) => {
        alert(e);
      },
    });

    this.wishListService.addToWishList(this.cartService.getAllWishListItemsFromLocalStroage()).subscribe({
      next(value) {
        console.log(value);

        for (var key in localStorage) {
          if (key.includes("formWishList_")) {
            localStorage.removeItem(key);
          }
        }
        
        
      },
    })};

    this.wishListService.getAllWishList().subscribe({
      next: (r) => {
        this.wishListProducts = r;
        this.wishListItems = this.cartService.getAllWishListItemsLength(); 
      },
      error: (e) => {
        alert(e);
      },
    });

     // the the user
     this.service.getTheUser(JSON.parse(this.loggedIn).id).subscribe({
      next: (r) => {
        this.theUser = r;
        console.log(r);
        console.log(this.theUser);
        
      },
      error: (e) => {
        console.log(e);
      },
    });

  }


// add to cart

deleteUser() {
  sessionStorage.removeItem(this.authService.USER_KEY);
  alert('You Have Logged Out: ');
}

onAddToCart(d: any) {
  const dialogRef = this.dialog.open(ShoptinCartComponent, {
    data: d,
  });
}

onAddToWishlist(d: any) {
  const dialogRef = this.dialog.open(WishListPageComponent, {
    data: d,
  });
}

goToUrPropile(){
  console.log(this.authService.getUser());
  console.log(JSON.parse(this.loggedIn));
  
  
  this.router.navigate(["/userPropile/" + JSON.parse(this.loggedIn).name])
}
  
}


