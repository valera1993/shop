import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { AdminService } from '../admin.service';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInfo } from '../productInfo'



@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
})
export class SingleProductComponent
  implements OnInit, AfterContentChecked
{
  singleProduct: any;
  productArray: ProductInfo [] = [];
  allProducts: any;
  constructor(
    private adminServ: AdminService,
    private dataServ: DataService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}
  flag: boolean = true;
  fullPrice: number = 0;
  date: string | undefined;

  createProductArray() {
    if (this.flag) {
      if (this.singleProduct && this.allProducts) {
        this.allProducts.forEach((element: any) => {
          for (let i = 0; i < this.singleProduct.products.length; i++) {
            if (element.id === this.singleProduct.products[i].productId) {
              const product = {
                title: element.title,
                price: element.price * this.singleProduct.products[i].quantity,
                quantity: this.singleProduct.products[i].quantity,
                id: element.id,
                date: this.singleProduct.date,
                userId: this.singleProduct.userId,
              };

              this.productArray.push(product);
              this.flag = false;
            }
          }
        });
      }
    }
  }

  getFullPrice() {
    if ((this.fullPrice == 0)) {
      this.productArray.forEach((item: any) => {
        this.fullPrice += item.price;
      });
      
    }
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.activateRoute });
  }

  ngOnInit(): void {
    this.singleProduct = this.adminServ.singleProduct;
    this.dataServ.getProducts().subscribe((res) => {
      this.allProducts = res;
    });
  }


  ngAfterContentChecked(): void {
    this.createProductArray();
    this.getFullPrice();
    this.date = this.productArray.length > 0 ? this.productArray[0].date : undefined;
  }
}
