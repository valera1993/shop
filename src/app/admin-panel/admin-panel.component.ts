import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { AdminService } from '../admin.service';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit, AfterContentChecked {
  private isFirstClick = true;
  dataArray: object[] | undefined;
  baskArray: object[] | undefined;
  numbOfGoods: number = 0;
  basketArray: any;
  singleBasketPrice: any;
  newOrderArray: any;
  constructor(
    private adminServ: AdminService,
    private dataServ: DataService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}
  start: Date | undefined;
  end: Date | undefined;

  selectDate() {
    if (this.dataArray) {
      this.basketArray = [...this.dataArray];
    }
    if (this.basketArray && this.start && this.end) {
      let arr = [];
      for (let obj in this.basketArray) {
        let date = new Date(this.basketArray[obj].date);
        if (date >= this.start && date <= this.end) {
          arr.push(this.basketArray[obj]);
        }
      }
      this.basketArray = arr;
    }
  }

  choseStartDate(date: string) {
    this.start = new Date(date);
  }

  choseEndDate(date: string) {
    this.end = new Date(date);
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.activateRoute });
  }

  getPriceInfo() {
    let fullSum = 0;
    if (this.basketArray && this.singleBasketPrice) {
      this.basketArray.forEach((element: any) => {
        for (let i = 0; i < element.products.length; i++) {
          for (let j = 0; j < this.singleBasketPrice.length; j++) {
            if (
              element.products[i].productId === this.singleBasketPrice[j].id
            ) {
              element.products[i].sum =
                element.products[i].quantity * this.singleBasketPrice[j].price;
            }
          }
          fullSum += element.products[i].sum;
        }
      });
      this.basketArray.fullSum = fullSum;
    }
  }

  getProductInfo(product: object) {
    this.adminServ.infoAboutSingleProduct(product);
  }

  showObject() {
    if (this.isFirstClick) {
      if (this.basketArray && this.newOrderArray) {
        for (let obj in this.newOrderArray) {
          this.basketArray.push(this.newOrderArray[obj]);
        }
      }
      this.adminServ.getdateArray(this.basketArray);

      this.isFirstClick = false;
    }
    this.dataArray = [...this.basketArray];
  }

  ngOnInit(): void {
    forkJoin([
      this.adminServ.getAllBaskets(),
      this.dataServ.getProducts(),
    ]).subscribe(([baskets, products]) => {
      this.basketArray = baskets;
      this.newOrderArray = this.adminServ.newOrder;
      this.dataArray = [...this.basketArray];

      this.singleBasketPrice = products;
      this.getPriceInfo();
      this.showObject();
    });
    this.baskArray = this.dataServ.basketArray;
    this.numbOfGoods = this.dataServ.basketArray.length;
    this.dataServ.getNumberOfGoods(this.numbOfGoods!);
  }

  ngAfterContentChecked(): void {
    this.getPriceInfo();
  }
}
