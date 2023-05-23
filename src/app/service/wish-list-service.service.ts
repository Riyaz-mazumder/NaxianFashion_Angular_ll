import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class WishListServiceService {
  constructor(private http: HttpClient) {}


  // private urlOfWishList = 'https://juicy-camera-production.up.railway.app/api/v1/wishList';

  // changed
  private urlOfWishList = 'http://localhost:8080/api/v1/wishList';

  public addToWishList(d: any) {
    return this.http.post(this.urlOfWishList, d);
  }

  public removeFromWishList(id: number) {
    return this.http.delete(this.urlOfWishList + '/' + id);
  }

  public getAllWishList() {
    return this.http.get(this.urlOfWishList);
  }


  public removeWishListItemFromLocalStorage(id: any): void {
    const value = "formWishList_" + id;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes(value)) {
        localStorage.removeItem(key);
        break;
      }
    }
  }

 
}
