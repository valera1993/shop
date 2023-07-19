import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { adminInfo } from './adminInfo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  singleProduct: object | undefined;
  newOrder: object[] = [];
  dateArray: object[] = [];

  getdateArray(dateArray: object[]) {
    this.dateArray = dateArray;
  }

  orderInfo(newOrder: any) {
    this.newOrder.push(newOrder);
  }

  infoAboutSingleProduct(singleProduct: object) {
    return (this.singleProduct = singleProduct);
  }

  getAllBaskets(): Observable<adminInfo> {
    return this.http.get<adminInfo>('https://fakestoreapi.com/carts');
  }
}
