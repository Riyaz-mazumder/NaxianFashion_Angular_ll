import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatabaseServiceService {
  constructor(private http: HttpClient) {}




  products: any;
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



  public productPage = 0;

  public pro: string = (this.productPage -1).toString();


 // Products Table
  private url = 'https://juicy-camera-production.up.railway.app/api/v1/products';
  // changed
  //  private url = 'http://localhost:8080/api/v1/products';

getProduct(pageNo: number){
  return this.http.get<ProductResponse>('https://juicy-camera-production.up.railway.app/api/v1/products?page=' + pageNo)
}



  searchProducts(data: string){
    return this.http.get("https://juicy-camera-production.up.railway.app/api/v1/product/" + data)
    // changed
    // return this.http.get("http://localhost:8080/api/v1/product" + data)
  }

  addNewProduct(data: any) {
    return this.http.post(this.url, data);
  }

  getAllProducts() {
    return this.http.get("https://juicy-camera-production.up.railway.app/api/v1/products?page=' + 2");
  }

  getProductById(id: any) {
    return this.http.get(this.url + '/' + id);
  }

  editProduct(newData: any) {
    return this.http.put(this.url, newData);
  }

  deleteProduct(id: any) {
    return this.http.delete(this.url + '/' + id);
  }

  // Admin Table
  // urlAdminLogin = 'http://localhost:8080/api/v1/admins';
  urlAdminLogin = 'https://juicy-camera-production.up.railway.app/v1/admins';


  getAdminCredential() {
    return this.http.get(this.urlAdminLogin);
  }

  /// User Account
  // uUrl = 'http://localhost:8080/api/v1/customers';
  uUrl = 'https://juicy-camera-production.up.railway.app/api/v1/customers';
  // 

  addUser(data: any) {
    return this.http.post(this.uUrl, data);
  }
  deleteUser(id: any) {
    return this.http.delete(this.uUrl + '/' + id);
  }
  getAllUsers() {
    return this.http.get(this.uUrl);
  }
  getTheUser(id: any) {
    return this.http.get(this.uUrl + '/' + id);
  }
  editUser(id: any, newData: any) {
    return this.http.put(this.uUrl, newData);
  }

  // Orders
  oUrl = 'https://juicy-camera-production.up.railway.app/api/v1/orders';
  // changed
  // oUrl = 'http://localhost:8080/api/v1/orders';
  addOrder(data: any) {
    return this.http.post(this.oUrl, data);
  }
  deleteOrder(id: any) {
    return this.http.delete(this.oUrl + '/delete/' + id);
  }
  getAllUnApprovedOrders() {
    return this.http.get<CustomerProductOrder>(this.oUrl);
  }
  getAllApprovedOrders() {
    return this.http.get(this.oUrl);
  }
  getAllOrders() {
    return this.http.get<CustomerProductOrder>(this.oUrl);
  }
  getTheOrder(id: any) {
    return this.http.get(this.oUrl + '/' + id);
  }
  editOrder(id: any, newData: any) {
    return this.http.put(this.oUrl, newData);
  }
  makeOrderApproved(id: any) {
    return this.http.put(this.oUrl + '/makeApprove/' + id, {});
  }

  sendEmail(data: any){
    return this.http.post("https://juicy-camera-production.up.railway.app/api/v1/sendEmail", data)
  }

  trackUrl = "https://juicy-camera-production.up.railway.app/api/v1/track"

  getTrackById(id: number){
    return this.http.get(this.trackUrl + "/" + id);
  }

  addToTrack(data: any){
    return this.http.post(this.trackUrl, data);
  }
}
interface Product {
  id: number;
  createdDateTime: string;
  createdBy: null;
  updatedDateTime: string;
  updatedBy: null;
  name: string;
  regularPrice: number;
  offerPrice: number;
  description: string;
  quantity: number;
  category: string;
  subCate: string;
  manufacture: string;
  productSize: string;
  productColor: string;
  weight: string;
  productImage_1: string;
  productImage_2: string;
  productImage_3: string;
  storeName: null;
  couponCode: string;
  active: boolean;
}

interface ProductResponse {
  content: Product[];
  pageable: any;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
interface CustomerProductOrder {
  id: number;
  createdDateTime: string;
  createdBy: null | string;
  updatedDateTime: string;
  updatedBy: null | string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  amount: number;
  products: string;
  customerId: null | string;
  paymentMethod: string;
  bikashNo: string;
  approved: boolean;
  trxID: null | string;
  active: boolean;
}
