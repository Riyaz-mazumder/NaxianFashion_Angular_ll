import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  constructor(private http: HttpClient) {}

  private urlOfCart = 'https://juicy-camera-production.up.railway.app/api/v1/cart';

  // changed
  // private urlOfCart = 'http://localhost:8080/api/v1/cart';

  public getAllFromCart() {
    return this.http.get(this.urlOfCart);
  }

  cartLength!: any;

  public getAllFromCartLength(){
    this.cartLength = this.getAllFromCart();
    return this.cartLength.length;
  }

  public addToCart(d: any) {
    return this.http.post(this.urlOfCart, d);
  }

  public deleteFromCart(id: number) {
    return this.http.delete(this.urlOfCart + '/' + id);
  }
  public updateCart(d: any) {
    return this.http.put(this.urlOfCart, d);
  }
  public getById(id: number){
    return this.http.get(this.urlOfCart + '/' + id);
  }


  public getAllCartItemsFromLocalStroage(): any[] {
    const items = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes('formCard_')) {
        const value = localStorage.getItem(key);
        if (value) {
          const parsedValue = JSON.parse(value);
          items.push(parsedValue);
        }
      }
    }
    return items;
  }

  public removeCartItemFromLommcalStorage(id: any): void {
    const value = "formCard_" + id;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes(value)) {
        localStorage.removeItem(key);
        break;
      }
    }
  }
  

  public getAllWishListItemsFromLocalStroage(): any[] {
    const items = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes('formWishList_')) {
        const value = localStorage.getItem(key);
        if (value) {
          const parsedValue = JSON.parse(value);
          items.push(parsedValue);
        }
      }
    }
    return items;
  }

  cartLocalLength!: any;
  wishListLength!: any;

 public getAllCartItemsFromLocalStroageLength(){
   return this.cartLocalLength = this.getAllCartItemsFromLocalStroage().length;
  }

  public getAllWishListItemsLength(){
    return this.wishListLength = this.getAllWishListItemsFromLocalStroage().length;

    }
}
