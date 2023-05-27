import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { NavbarComponent } from 'src/app/common/navbar/navbar.component';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { DatabaseServiceService } from 'src/app/service/database-service.service';
import { ShareDataService } from 'src/app/service/share-data.service';
import { WishListServiceService } from 'src/app/service/wish-list-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit{
  constructor(
    private service: DatabaseServiceService,
    private authService: AuthServiceService,
    private router: Router,
    private cartService: CartServiceService,
    private wishListService: WishListServiceService,
    private http: HttpClient,
    private sharedService: ShareDataService,
    private renderer: Renderer2,
  ) {}


 

  // This One
  allProducts!: any;


  loggedIn!: any;
  theUser!: any;


  // ngOnInit(): void {

  //   this.http.get<ProductResponse>("https://juicy-camera-production.up.railway.app/api/v1/products").subscribe({
  //     next: n=>{
  //       this.products = n;
  //       console.log(this.products);
  //       this.productPage = n.totalPages;
  //     },
  //     error: e=>{
  //       console.log(e);
        
  //     }
  //   })
  // }


pageId: number = 0;


getProduct(page: number){
  this.service.getProduct(page).subscribe({
    next: (r) => {
      // this.allProducts = r;
      // this.allProducts.content.reverse();
      // console.log(this.allProducts.totalPages -1);


      // this.products = n;
            // console.log(this.products);
            this.pageId = r.totalPages;
      
    },
    error: (err) => {
      this.message = "Somthing Went Wrong, If You See This Plese Contact Us";
      this.showMessage();
    },
  });

}

  ngOnInit() {


    this.loggedIn = this.authService.getUser();

    
  

 


    this.service.getAllProducts().subscribe({
      next: (r) => {
        this.allProducts = r;
        this.allProducts.content.reverse();
        console.log(this.allProducts.totalPages -1);
        // this.service.productPage =  (this.allProducts.totalPages -1).toString();

        // this.service.getAllProducts().subscribe({
        //   next: (value) =>{
        //     this.allProducts = value;
        //     this.allProducts.content.reverse();
        //   },
        //   error: e=>{
        //     this.message = "Somthing Went Wrong, If You See This Plese Contact Us";
        //     this.showMessage();
        //   }

        // })
        
      },
      error: (err) => {
        this.message = "Somthing Went Wrong, If You See This Plese Contact Us";
        this.showMessage();
      },
    });

    if (this.allProducts.content.length > 0) {
      this.allProducts.content[0].clicked = true; // Set first element to clicked
    }
   
  }

  toggleClickedState(element: any) {
    element.clicked = !element.clicked;
    console.log(element);
    
  }

  cardList: any[] = [];
  // Product Clicked
  productClicked(PId: any) {
    // navigate the page
    this.router.navigate(['/productView/' + PId]);
  }

  // Shopping Card Clicked
  shopping(f: string, obj: any) {
    // obj.id = null;
    obj.quantity = 1;

    if (this.loggedIn === null) {
      if (f === 'formWishList') {

        localStorage.setItem("formWishList_" + obj.id.toString(), JSON.stringify(obj));

        this.sharedService.triggerOnInit();
        this.message = "Added To Your WishList";
        this.showMessage();
        
        
      } else if (f === 'formCard') {

        localStorage.setItem("formCard_" + obj.id.toString(), JSON.stringify(obj));

        this.sharedService.triggerOnInit();
        this.message = "Added To Your Cart";
        this.showMessage();

      }
      
    } else {
      if (f === 'formWishList') {
        this.wishListService.addToWishList(obj).subscribe({
          next: (r) => {
            this.sharedService.triggerOnInit();
            this.message = "Added To Your WishList";
            this.showMessage();
          },
          error: (e) => {
            this.message = "Somthing Went Wrong, Plese Contact Us";
             this.showMessage();
             this.ngOnInit();
          },
        });
      } else if (f === 'formCard') {
        this.cartService.addToCart(obj).subscribe({
          next: (r) => {
            this.sharedService.triggerOnInit();
            this.message = "Added To Your Cart";
            this.showMessage();
          },
          error: (e) => {
            this.message = "Somthing Went Wrong, Plese Contact Us";
            this.showMessage();
            this.ngOnInit();
          },
        });
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
