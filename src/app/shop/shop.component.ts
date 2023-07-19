import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { DataService } from '../data.service';
import { ProductsInfo } from '../productsInfo'


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent  implements OnInit, AfterContentChecked {
  constructor(private dataServ: DataService) {}
  title = 'store';
  numbOfGoods: number = 0;

  products: any;
  filterSelected: boolean = false;
  filterContent: string = ''
  productsArray: ProductsInfo [] | undefined;
  categories: any;
  page: number = 0;
  activeDescending: boolean = false;
  activeAscending: boolean = false;
  lastValue: any;
  maxPages: any;
  pageNumber: number = 1;
  basketArray: object [] = []; 

  addToBasket(item: object){
    this.basketArray.push(item)
  }

  addGoods(){
    this.numbOfGoods += 1
  }

  showCart(id: string){
    this.dataServ.getProductById(id)
    this.dataServ.infoAboutGoods(this.numbOfGoods, this.basketArray)
  }

  getName(value: string) {
    this.lastValue = this.dataServ.getLastValue();
    this.dataServ.getCategory(value).subscribe((res) => {
      this.products = res;
      this.products = this.dataServ.sortArray(this.lastValue, this.products);
      
    });
  }

  sortDescending() {
    this.products = this.dataServ.sortArray(false, this.products);
    this.activeDescending = true;
    this.activeAscending = false;
    this.filterSelected = true;
    this.filterContent = "Filter by decreasing price";
  }

  sortAscending() {
    this.products = this.dataServ.sortArray(true, this.products);
    this.activeAscending = true;
    this.activeDescending = false;
    this.filterSelected = true;
    this.filterContent = "Filter by increasing price";
  }

  checkFilter() {
    if (this.activeAscending) {
      this.sortAscending();
    }
    if (this.activeDescending) {
      this.sortDescending();
    }
  }

  leafThroughNext() {
    this.page += 4;
    this.pageNumber += 1;
    this.products = this.dataServ.getDataArray(this.page, this.productsArray);
    if (Object.keys(this.products).length == 0) {
      this.leafThroughBack();
    }
    this.checkFilter();
  }

  leafThroughBack() {
    this.page -= 4;
    this.pageNumber -= 1;
    if (this.pageNumber < 1) this.pageNumber = 1;
    if (this.page < 0) this.page = 0;
    this.products = this.dataServ.getDataArray(this.page, this.productsArray);
    this.checkFilter();
  }

  ngOnInit(): void {
    this.dataServ.getProducts().subscribe((res) => {
      (this.products = res), (this.productsArray = [...this.products]);
      this.maxPages = Math.floor(this.products.length / 4)
      this.products.length = 4;
    });

    this.dataServ.getCategories().subscribe((res) => {
      this.categories = res;
    });

    this.dataServ.getCatrs().subscribe((res) => {
    });
    this.basketArray = this.dataServ.basketArray
    this.numbOfGoods = this.dataServ.numbOfGoods
    }

  ngAfterContentChecked(): void {}
}
