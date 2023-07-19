import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsInfo } from './productsInfo'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  productsArray: any;
  page: number = 0;
  sort: boolean = true;
  lastValue: any;
  arrayWithDescription: any | undefined;
  numbOfGoods: number = 0;
  basketArray: object [] = []; 


  getNumberOfGoods(numberOfGoods: number){
    this.numbOfGoods = numberOfGoods;
  }

  infoAboutGoods(numberOfGoods: number, basketArray: object []){
    this.numbOfGoods = numberOfGoods;
    this.basketArray = basketArray
  }

  getProductById(id: string){
    this.arrayWithDescription = this.http.get('https://fakestoreapi.com/products/' + id);
  }

  returnarrayWithDescription(){
    return this.arrayWithDescription
  }

  getLastValue(){
    return this.lastValue
  }

  sortArray(sort: boolean, array: any) {
      this.sort = sort
      this.lastValue = this.sort;
    if (this.sort) {
      array.sort(function (a: any, b: any) {
        return a.price - b.price;
      });
      return array
    } 
    if (!this.sort){
      array.sort(function (a: any, b: any) {
        return b.price - a.price; 
      });
      return array
    }

  }

  getDataArray(page: number, array: ProductsInfo [] | undefined) {
    this.page = page;
    this.productsArray = array;
    this.productsArray = this.productsArray.slice(page, page + 4);
    return this.productsArray;
  }

  getProducts():Observable<ProductsInfo> {
    return this.http.get<ProductsInfo>('https://fakestoreapi.com/products');
  }

  getCategories():Observable<ProductsInfo> {
    return this.http.get<ProductsInfo>('https://fakestoreapi.com/products/categories');
  }

  getCatrs():Observable<ProductsInfo>{
    return this.http.get<ProductsInfo>('https://fakestoreapi.com/carts');
  }

  getCategory(value : string):Observable<ProductsInfo> {
    return this.http.get<ProductsInfo>("https://fakestoreapi.com/products/category/" + value)
  }
}
// value:string
//'https://fakestoreapi.com/products/category/jewelery'
