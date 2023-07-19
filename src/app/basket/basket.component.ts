import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  constructor(
    private adminServ: AdminService,
    private dataServ: DataService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}
  basketArray: any[] | undefined;
  numbOfGoods: number = 0;
  totalPrice: number = 0;
  adminArray: any;
  maxUserId: number = 0;
  maxId: number = 0;
  count: number = 1;

  getOrderInfo() {
    this.adminArray = {};
    let date = new Date().toISOString().slice(0, 10) + 'T00:00:00.000Z';
    let products: any[] = [];
    this.adminArray.date = date;
    this.adminArray.id = this.maxId;
    this.adminArray.userId = this.maxUserId + this.count;
    this.count += 1;
    const product: any = {};
    if (this.basketArray && this.basketArray.length > 0) {
      for (const obj of this.basketArray) {
        const id = obj.id;
        product[id] = product[id] ? product[id] + 1 : 1;
      }
      for (const id in product) {
        const quantity = product[id];
        products.push({ productId: Number(id), quantity });
      }
      this.adminArray.products = products;
      this.adminServ.orderInfo(this.adminArray);
      this.basketArray = [];
      this.dataServ.infoAboutGoods(0, this.basketArray);
      this.back();
    }
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.activateRoute });
  }

  getTotal(array: any[]) {
    array.forEach((element) => {
      this.totalPrice += element.price;
    });
  }

  ngOnInit(): void {
    this.adminServ.getAllBaskets().subscribe((res) => {
      this.adminArray = res;
      this.adminArray.forEach((element: any) => {
        if (element.userId > this.maxUserId) {
          this.maxUserId = element.userId;
        }
        if (element.id > this.maxId) {
          this.maxId = element.id;
        }
      });
    });

    this.basketArray = this.dataServ.basketArray;

    this.numbOfGoods = this.dataServ.basketArray.length;
    this.dataServ.infoAboutGoods(this.numbOfGoods, this.basketArray);
    this.getTotal(this.basketArray);
  }

}
