import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CheckOutPageComponent } from '../check-out-page/check-out-page.component';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ShareDataService } from 'src/app/service/share-data.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-shoptin-cart',
  templateUrl: './shoptin-cart.component.html',
  styleUrls: ['./shoptin-cart.component.scss'],
})
export class ShoptinCartComponent implements OnInit {
  allCartProducts!: any;


  loggedIn!: any;

  constructor(
    private dialogRef: MatDialogRef<ShoptinCartComponent>,
    private service: CartServiceService,
    private authService: AuthServiceService,
    private cartService: CartServiceService,
    private sharedService:ShareDataService,
    private router: Router,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.allCartProducts = data;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.dialog.closeAll(); // Close all open dialogs when navigation starts
      }
    });
  }
  public  message: string = "";
   couponCodeProduct!: any;

  couponCodeApply( data: NgForm, d:any){

    if(d.couponCode === null){
      alert("This Product does not have any Coupon Code")
    }else{
      if(d.couponCode === data.value.coupon){
        const discountNumber = parseInt(d.couponCode.match(/\d+/)[0]);
        
       
        console.log( d.offerPrice - discountNumber);
        const ff=  d.offerPrice - discountNumber;
        d.offerPrice = ff;

        console.log(d);
       
        
        this.service.updateCart(d).subscribe({
          next: (r) => {
            console.log(r);
          },
          error: (e) => {
            alert(e);
          },
        });
        this.ngOnInit();
          
      }else{
        alert("Not A Valid Coupon Code")
      }
    }
   
  }

  updateQuantity(index: number, d: any, quantity: number) {
    d.productQuantity = quantity;

    this.loggedIn = this.authService.getUser();
    
    if(this.loggedIn === null){
      
    }

    // possible change
    this.service.updateCart(d).subscribe({
      next: (r) => {
        console.log(r);
      },
      error: (e) => {
        alert(e);
      },
    });
    // this.productQuantity = quantity;
    // console.log(this.productQuantity);

    // Quality Update Query
    this.ngOnInit();
  }
  Products!: any;

  ngOnInit(): void {
    
    this.loggedIn = this.authService.getUser();
    
    if(this.loggedIn === null){

      this.Products = this.service.getAllCartItemsFromLocalStroage();
      this.calculateTotalValue();
      this.calculateTotalItems();
      
    }else{
      this.service.getAllFromCart().subscribe({
        next: (r) => {
          this.Products = r;
        },
        error: (e) => {
          alert(e);
        },
      });
      this.calculateTotalValue();
      this.calculateTotalItems();
    }
    }

    

  productQuantity!: number;
  totalValue: number = 0;
  totalItems: number = 0;

  calculateTotalValue() {
    for (let product of this.Products) {
      this.totalValue += product.offerPrice * product.quantity;
    }
  }

  calculateTotalItems() {
    this.totalItems = this.Products.length;
  }


  
  cardProductRemove(id: number) {

    this.loggedIn = this.authService.getUser();
    

    if(this.loggedIn === null){
       this.cartService.removeCartItemFromLommcalStorage(id.toString());
       this.calculateTotalValue();
       this.calculateTotalItems();
       this.ngOnInit();
       this.sharedService.triggerOnInit();
       this.message = "Removed From Cart"
       this.showMessage();

    }else{
      // cardProductRemoveQuery;
    this.service.deleteFromCart(id).subscribe({
      next: (r) => {
        this.calculateTotalValue();
        this.calculateTotalItems();
        this.ngOnInit();
       this.sharedService.triggerOnInit();
       this.message = "Removed From Cart"
       this.showMessage();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

    }

    

  productsInCart: any;

  buyAllFromShoppingCart() {
    this.dialogRef.close();
    const dialogRefs = this.dialog.open(CheckOutPageComponent, {
      data: this.Products,
    });
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
