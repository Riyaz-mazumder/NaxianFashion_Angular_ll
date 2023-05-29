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
export class HomePageComponent implements OnInit, AfterViewInit{
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
isLoading: boolean = true;

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
    
    setTimeout(() => {
      this.isLoading = false; // Set isLoading to false to hide the loading animation after the content is loaded
    }, 2000); // Adjust

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


  ngAfterViewInit() {
    this.renderer.listen(window, 'load', () => {
      const preLoadingElement = document.getElementById('preLoading');
      this.renderer.setStyle(preLoadingElement, 'display', 'none');
    });
  }


  mostPopular= [
    {
    "id": 1,
    "createdDateTime": null,
    "createdBy": null,
    "updatedDateTime": null,
    "updatedBy": null,
    "name": "Casual Shirt",
    "regularPrice": 1600,
    "offerPrice": 1350,
    "description": "A good quality product",
    "quantity": 70,
    "category": "man",
    "subCate": "Shirt",
    "manufacture": "Infinity",
    "productSize": "S,M,L,XL,XXL",
    "productColor": "Green",
    "weight": "500g",
    "productImage_1": "https://infinitymegamall.com/wp-content/uploads/2023/02/25a.jpg",
    "productImage_2": "https://infinitymegamall.com/wp-content/uploads/2023/02/41a.jpg",
    "productImage_3": "https://infinitymegamall.com/wp-content/uploads/2023/01/16a-370x444.jpg",
    "storeName": null,
    "couponCode": "S-100",
    "active": false
    },
    {
    "id": 52,
    "createdDateTime": "2023-04-16T00:48:04.113193",
    "createdBy": null,
    "updatedDateTime": "2023-04-16T00:48:04.127099",
    "updatedBy": null,
    "name": "Shirt",
    "regularPrice": 2400,
    "offerPrice": 2100,
    "description": "A good quality product",
    "quantity": 5,
    "category": "man",
    "subCate": "Shirt",
    "manufacture": "Infinity",
    "productSize": "S,M,L,XL,XXL",
    "productColor": "Green",
    "weight": "500g",
    "productImage_1": "https://infinitymegamall.com/wp-content/uploads/2022/07/23a.jpg",
    "productImage_2": "https://infinitymegamall.com/wp-content/uploads/2023/02/41a.jpg",
    "productImage_3": "https://infinitymegamall.com/wp-content/uploads/2023/01/16a-370x444.jpg",
    "storeName": null,
    "couponCode": null,
    "active": false
    },
    {
      "id": 152,
      "createdDateTime": "2023-05-29T09:49:09.06103",
      "createdBy": null,
      "updatedDateTime": "2023-05-29T09:49:09.061192",
      "updatedBy": null,
      "name": " Ray-Ban CARAVAN - ARISTA Frame CRYSTAL",
      "regularPrice": 5300,
      "offerPrice": 5000,
      "description": "A good quality product",
      "quantity": 10,
      "category": "lifeStyle",
      "subCate": "Glasses",
      "manufacture": "aarong",
      "productSize": "M",
      "productColor": "Black",
      "weight": "20g",
      "productImage_1": "https://productimage.jeeliz.com/US_rayban_caravan_or_vert_classique.jpg",
      "productImage_2": "https://productimage.jeeliz.com/US_rayban_caravan_or_vert_classique.jpg",
      "productImage_3": "",
      "storeName": null,
      "couponCode": "",
      "active": false
      },
      {
        "id": 103,
        "createdDateTime": "2023-04-16T02:11:29.535075",
        "createdBy": null,
        "updatedDateTime": "2023-04-16T02:11:29.535075",
        "updatedBy": null,
        "name": "ZARZAIN TOPS",
        "regularPrice": 1999,
        "offerPrice": 1950,
        "description": "A good quality product",
        "quantity": 1,
        "category": "women",
        "subCate": "Tops",
        "manufacture": "Ecstasy",
        "productSize": "S,M,L,XL,XXL",
        "productColor": "White",
        "weight": "500g",
        "productImage_1": "https://ecstasybd.com/all-images/product/Product-Image-1680864959.jpg",
        "productImage_2": "https://ecstasybd.com/all-images/product/Product-Image-11680864959.jpg",
        "productImage_3": null,
        "storeName": null,
        "couponCode": null,
        "active": false
        },
        {
          "id": 57,
          "createdDateTime": "2023-04-16T01:38:21.925952",
          "createdBy": null,
          "updatedDateTime": "2023-04-16T01:38:21.93094",
          "updatedBy": null,
          "name": "Red Half Silk Jamdani Saree",
          "regularPrice": 17600,
          "offerPrice": 15785,
          "description": "A good quality product",
          "quantity": 10,
          "category": "women",
          "subCate": "Sharee",
          "manufacture": "Arong",
          "productSize": "S,M,L,XL,XXL",
          "productColor": "Red",
          "weight": "500g",
          "productImage_1": "https://www.aarong.com/media/catalog/product/0/5/0550000138130.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=667&width=500&canvas=500:667",
          "productImage_2": "https://www.aarong.com/media/catalog/product/0/5/0550000138130_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=667&width=500&canvas=500:667",
          "productImage_3": "https://www.aarong.com/media/catalog/product/0/5/0550000138130_2.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=667&width=500&canvas=500:667",
          "storeName": null,
          "couponCode": null,
          "active": false
          },
          {
          "id": 102,
          "createdDateTime": "2023-04-16T02:08:13.863805",
          "createdBy": null,
          "updatedDateTime": "2023-04-16T02:08:13.865793",
          "updatedBy": null,
          "name": "Fuchsia Silk Saree",
          "regularPrice": 25300,
          "offerPrice": 25000,
          "description": "A good quality product",
          "quantity": 50,
          "category": "man",
          "subCate": "Saree",
          "manufacture": "aarong",
          "productSize": "S,M,L,XL,XXL",
          "productColor": "orange",
          "weight": "500g",
          "productImage_1": "https://www.aarong.com/media/catalog/product/0/5/0540000021304.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=667&width=500&canvas=500:667",
          "productImage_2": "https://www.aarong.com/media/catalog/product/0/5/0540000021304_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=667&width=500&canvas=500:667",
          "productImage_3": "https://www.aarong.com/media/catalog/product/0/5/0540000021304.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=667&width=500&canvas=500:667",
          "storeName": null,
          "couponCode": null,
          "active": false
          },
        
          {
          "id": 104,
          "createdDateTime": "2023-04-16T02:14:05.863993",
          "createdBy": null,
          "updatedDateTime": "2023-04-16T02:14:05.863993",
          "updatedBy": null,
          "name": "ZARZAIN TOPS",
          "regularPrice": 2450,
          "offerPrice": 2400,
          "description": "A good quality product",
          "quantity": 50,
          "category": "women",
          "subCate": "Tops",
          "manufacture": "Ecstasy",
          "productSize": "S,M,L,XL,XXL",
          "productColor": "Green",
          "weight": "500g",
          "productImage_1": "https://ecstasybd.com/all-images/product/Product-Image-1680509243.jpg",
          "productImage_2": "https://ecstasybd.com/all-images/product/Product-Image-11680509243.jpg",
          "productImage_3": null,
          "storeName": null,
          "couponCode": null,
          "active": false
          },
    {
    "id": 53,
    "createdDateTime": "2023-04-16T01:21:20.401684",
    "createdBy": null,
    "updatedDateTime": "2023-04-16T01:21:20.403669",
    "updatedBy": null,
    "name": "TANJIM PANJABI",
    "regularPrice": 5300,
    "offerPrice": 5000,
    "description": "A good quality product",
    "quantity": 4,
    "category": "man",
    "subCate": "Panjabi ",
    "manufacture": "Ecstasy",
    "productSize": "S,M,L,XL,XXL",
    "productColor": "Black",
    "weight": "500g",
    "productImage_1": "https://ecstasybd.com/all-images/product/Product-Image-1663824988.jpg",
    "productImage_2": "https://ecstasybd.com/all-images/product/Product-Image-11663824988.jpg",
    "productImage_3": "https://ecstasybd.com/all-images/product/Product-Image-21663824988.jpg",
    "storeName": null,
    "couponCode": null,
    "active": false
    },
    {
    "id": 54,
    "createdDateTime": "2023-04-16T01:24:28.812657",
    "createdBy": null,
    "updatedDateTime": "2023-04-16T01:24:28.81663",
    "updatedBy": null,
    "name": "TANJIM PREMIUM PANJABI",
    "regularPrice": 2850,
    "offerPrice": 2500,
    "description": "A good quality product",
    "quantity": 2,
    "category": "man",
    "subCate": "Panjabi ",
    "manufacture": "Ecstasy",
    "productSize": "S,M,L,XL,XXL",
    "productColor": "Black",
    "weight": "500g",
    "productImage_1": "https://ecstasybd.com/all-images/product/Product-Image-1663824560.jpg",
    "productImage_2": "https://ecstasybd.com/all-images/product/Product-Image-11663824560.jpg",
    "productImage_3": "https://ecstasybd.com/all-images/product/Product-Image-21663824560.jpg",
    "storeName": null,
    "couponCode": null,
    "active": false
    },
    {
    "id": 55,
    "createdDateTime": "2023-04-16T01:26:25.518457",
    "createdBy": null,
    "updatedDateTime": "2023-04-16T01:26:25.518457",
    "updatedBy": null,
    "name": "TANJIM SQUAD T-SHIRT",
    "regularPrice": 2200,
    "offerPrice": 2100,
    "description": "A good quality product",
    "quantity": 30,
    "category": "man",
    "subCate": "T-Shirt",
    "manufacture": "Ecstasy",
    "productSize": "S,M,L,XL,XXL",
    "productColor": "white",
    "weight": "500g",
    "productImage_1": "https://ecstasybd.com/all-images/product/Product-Image-1665208937.jpg",
    "productImage_2": "https://ecstasybd.com/all-images/product/Product-Image-11665208937.jpg",
    "productImage_3": "https://ecstasybd.com/all-images/product/Product-Image-21667198566.jpg",
    "storeName": null,
    "couponCode": null,
    "active": false
    },
    {
    "id": 56,
    "createdDateTime": "2023-04-16T01:29:00.484733",
    "createdBy": null,
    "updatedDateTime": "2023-04-16T01:29:00.484733",
    "updatedBy": null,
    "name": "TANJIM T-SHIRT",
    "regularPrice": 2700,
    "offerPrice": 2650,
    "description": "A good quality product",
    "quantity": 50,
    "category": "man",
    "subCate": "T-shirt",
    "manufacture": "Ecstasy",
    "productSize": "S,M,L,XL,XXL",
    "productColor": "Blue",
    "weight": "500g",
    "productImage_1": "https://ecstasybd.com/all-images/product/Product-Image-1651040382.jpg",
    "productImage_2": "https://ecstasybd.com/all-images/product/Product-Image-11651040382.jpg",
    "productImage_3": "https://ecstasybd.com/all-images/product/Product-Image-1651040382.jpg",
    "storeName": null,
    "couponCode": null,
    "active": false
    },
   
  
    ];


    topSelling =[
      {
      "id": 1,
      "createdDateTime": null,
      "createdBy": null,
      "updatedDateTime": null,
      "updatedBy": null,
      "name": "Casual Shirt",
      "regularPrice": 1600,
      "offerPrice": 1350,
      "description": "A good quality product",
      "quantity": 70,
      "category": "man",
      "subCate": "Shirt",
      "manufacture": "Infinity",
      "productSize": "S,M,L,XL,XXL",
      "productColor": "Green",
      "weight": "500g",
      "productImage_1": "https://infinitymegamall.com/wp-content/uploads/2023/02/25a.jpg",
      "productImage_2": "https://infinitymegamall.com/wp-content/uploads/2023/02/41a.jpg",
      "productImage_3": "https://infinitymegamall.com/wp-content/uploads/2023/01/16a-370x444.jpg",
      "storeName": null,
      "couponCode": "S-100",
      "active": false
      },
      {
      "id": 52,
      "createdDateTime": "2023-04-16T00:48:04.113193",
      "createdBy": null,
      "updatedDateTime": "2023-04-16T00:48:04.127099",
      "updatedBy": null,
      "name": "Shirt",
      "regularPrice": 2400,
      "offerPrice": 2100,
      "description": "A good quality product",
      "quantity": 5,
      "category": "man",
      "subCate": "Shirt",
      "manufacture": "Infinity",
      "productSize": "S,M,L,XL,XXL",
      "productColor": "Green",
      "weight": "500g",
      "productImage_1": "https://infinitymegamall.com/wp-content/uploads/2022/07/23a.jpg",
      "productImage_2": "https://infinitymegamall.com/wp-content/uploads/2023/02/41a.jpg",
      "productImage_3": "https://infinitymegamall.com/wp-content/uploads/2023/01/16a-370x444.jpg",
      "storeName": null,
      "couponCode": null,
      "active": false
      },
      {
        "id": 57,
        "createdDateTime": "2023-04-16T01:38:21.925952",
        "createdBy": null,
        "updatedDateTime": "2023-04-16T01:38:21.93094",
        "updatedBy": null,
        "name": "Red Half Silk Jamdani Saree",
        "regularPrice": 17600,
        "offerPrice": 15785,
        "description": "A good quality product",
        "quantity": 10,
        "category": "women",
        "subCate": "Sharee",
        "manufacture": "Arong",
        "productSize": "S,M,L,XL,XXL",
        "productColor": "Red",
        "weight": "500g",
        "productImage_1": "https://www.aarong.com/media/catalog/product/0/5/0550000138130.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=667&width=500&canvas=500:667",
        "productImage_2": "https://www.aarong.com/media/catalog/product/0/5/0550000138130_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=667&width=500&canvas=500:667",
        "productImage_3": "https://www.aarong.com/media/catalog/product/0/5/0550000138130_2.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=667&width=500&canvas=500:667",
        "storeName": null,
        "couponCode": null,
        "active": false
        },
        {
        "id": 102,
        "createdDateTime": "2023-04-16T02:08:13.863805",
        "createdBy": null,
        "updatedDateTime": "2023-04-16T02:08:13.865793",
        "updatedBy": null,
        "name": "Fuchsia Silk Saree",
        "regularPrice": 25300,
        "offerPrice": 25000,
        "description": "A good quality product",
        "quantity": 50,
        "category": "man",
        "subCate": "Saree",
        "manufacture": "aarong",
        "productSize": "S,M,L,XL,XXL",
        "productColor": "orange",
        "weight": "500g",
        "productImage_1": "https://www.aarong.com/media/catalog/product/0/5/0540000021304.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=667&width=500&canvas=500:667",
        "productImage_2": "https://www.aarong.com/media/catalog/product/0/5/0540000021304_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=667&width=500&canvas=500:667",
        "productImage_3": "https://www.aarong.com/media/catalog/product/0/5/0540000021304.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=667&width=500&canvas=500:667",
        "storeName": null,
        "couponCode": null,
        "active": false
        },
        {
        "id": 103,
        "createdDateTime": "2023-04-16T02:11:29.535075",
        "createdBy": null,
        "updatedDateTime": "2023-04-16T02:11:29.535075",
        "updatedBy": null,
        "name": "ZARZAIN TOPS",
        "regularPrice": 1999,
        "offerPrice": 1950,
        "description": "A good quality product",
        "quantity": 1,
        "category": "women",
        "subCate": "Tops",
        "manufacture": "Ecstasy",
        "productSize": "S,M,L,XL,XXL",
        "productColor": "White",
        "weight": "500g",
        "productImage_1": "https://ecstasybd.com/all-images/product/Product-Image-1680864959.jpg",
        "productImage_2": "https://ecstasybd.com/all-images/product/Product-Image-11680864959.jpg",
        "productImage_3": null,
        "storeName": null,
        "couponCode": null,
        "active": false
        },
        {
        "id": 104,
        "createdDateTime": "2023-04-16T02:14:05.863993",
        "createdBy": null,
        "updatedDateTime": "2023-04-16T02:14:05.863993",
        "updatedBy": null,
        "name": "ZARZAIN TOPS",
        "regularPrice": 2450,
        "offerPrice": 2400,
        "description": "A good quality product",
        "quantity": 50,
        "category": "women",
        "subCate": "Tops",
        "manufacture": "Ecstasy",
        "productSize": "S,M,L,XL,XXL",
        "productColor": "Green",
        "weight": "500g",
        "productImage_1": "https://ecstasybd.com/all-images/product/Product-Image-1680509243.jpg",
        "productImage_2": "https://ecstasybd.com/all-images/product/Product-Image-11680509243.jpg",
        "productImage_3": null,
        "storeName": null,
        "couponCode": null,
        "active": false
        },
        {
        "id": 152,
        "createdDateTime": "2023-05-29T09:49:09.06103",
        "createdBy": null,
        "updatedDateTime": "2023-05-29T09:49:09.061192",
        "updatedBy": null,
        "name": " Ray-Ban CARAVAN - ARISTA Frame CRYSTAL",
        "regularPrice": 5300,
        "offerPrice": 5000,
        "description": "A good quality product",
        "quantity": 10,
        "category": "lifeStyle",
        "subCate": "Glasses",
        "manufacture": "aarong",
        "productSize": "M",
        "productColor": "Black",
        "weight": "20g",
        "productImage_1": "https://productimage.jeeliz.com/US_rayban_caravan_or_vert_classique.jpg",
        "productImage_2": "https://productimage.jeeliz.com/US_rayban_caravan_or_vert_classique.jpg",
        "productImage_3": "",
        "storeName": null,
        "couponCode": "",
        "active": false
        },
      {
      "id": 53,
      "createdDateTime": "2023-04-16T01:21:20.401684",
      "createdBy": null,
      "updatedDateTime": "2023-04-16T01:21:20.403669",
      "updatedBy": null,
      "name": "TANJIM PANJABI",
      "regularPrice": 5300,
      "offerPrice": 5000,
      "description": "A good quality product",
      "quantity": 4,
      "category": "man",
      "subCate": "Panjabi ",
      "manufacture": "Ecstasy",
      "productSize": "S,M,L,XL,XXL",
      "productColor": "Black",
      "weight": "500g",
      "productImage_1": "https://ecstasybd.com/all-images/product/Product-Image-1663824988.jpg",
      "productImage_2": "https://ecstasybd.com/all-images/product/Product-Image-11663824988.jpg",
      "productImage_3": "https://ecstasybd.com/all-images/product/Product-Image-21663824988.jpg",
      "storeName": null,
      "couponCode": null,
      "active": false
      },
      {
      "id": 54,
      "createdDateTime": "2023-04-16T01:24:28.812657",
      "createdBy": null,
      "updatedDateTime": "2023-04-16T01:24:28.81663",
      "updatedBy": null,
      "name": "TANJIM PREMIUM PANJABI",
      "regularPrice": 2850,
      "offerPrice": 2500,
      "description": "A good quality product",
      "quantity": 2,
      "category": "man",
      "subCate": "Panjabi ",
      "manufacture": "Ecstasy",
      "productSize": "S,M,L,XL,XXL",
      "productColor": "Black",
      "weight": "500g",
      "productImage_1": "https://ecstasybd.com/all-images/product/Product-Image-1663824560.jpg",
      "productImage_2": "https://ecstasybd.com/all-images/product/Product-Image-11663824560.jpg",
      "productImage_3": "https://ecstasybd.com/all-images/product/Product-Image-21663824560.jpg",
      "storeName": null,
      "couponCode": null,
      "active": false
      },
      {
      "id": 55,
      "createdDateTime": "2023-04-16T01:26:25.518457",
      "createdBy": null,
      "updatedDateTime": "2023-04-16T01:26:25.518457",
      "updatedBy": null,
      "name": "TANJIM SQUAD T-SHIRT",
      "regularPrice": 2200,
      "offerPrice": 2100,
      "description": "A good quality product",
      "quantity": 30,
      "category": "man",
      "subCate": "T-Shirt",
      "manufacture": "Ecstasy",
      "productSize": "S,M,L,XL,XXL",
      "productColor": "white",
      "weight": "500g",
      "productImage_1": "https://ecstasybd.com/all-images/product/Product-Image-1665208937.jpg",
      "productImage_2": "https://ecstasybd.com/all-images/product/Product-Image-11665208937.jpg",
      "productImage_3": "https://ecstasybd.com/all-images/product/Product-Image-21667198566.jpg",
      "storeName": null,
      "couponCode": null,
      "active": false
      },
      {
      "id": 56,
      "createdDateTime": "2023-04-16T01:29:00.484733",
      "createdBy": null,
      "updatedDateTime": "2023-04-16T01:29:00.484733",
      "updatedBy": null,
      "name": "TANJIM T-SHIRT",
      "regularPrice": 2700,
      "offerPrice": 2650,
      "description": "A good quality product",
      "quantity": 50,
      "category": "man",
      "subCate": "T-shirt",
      "manufacture": "Ecstasy",
      "productSize": "S,M,L,XL,XXL",
      "productColor": "Blue",
      "weight": "500g",
      "productImage_1": "https://ecstasybd.com/all-images/product/Product-Image-1651040382.jpg",
      "productImage_2": "https://ecstasybd.com/all-images/product/Product-Image-11651040382.jpg",
      "productImage_3": "https://ecstasybd.com/all-images/product/Product-Image-1651040382.jpg",
      "storeName": null,
      "couponCode": null,
      "active": false
      },
     
      ]

}
