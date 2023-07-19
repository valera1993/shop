import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private dataServ: DataService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}
  arrayWithDescription:  any | undefined;
  numbOfGoods: number = 0;
  pageBack: boolean = false;
  basketArray: object [] = []; 

  addGoods(){
    this.numbOfGoods += 1
    this.dataServ.infoAboutGoods(this.numbOfGoods, this.basketArray)
  }

  addItem(item : object []){
    this.basketArray.push(item)
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.activateRoute });
  }

  ngOnInit(): void {
    this.basketArray = this.dataServ.basketArray
    this.numbOfGoods = this.dataServ.numbOfGoods
    this.pageBack = true;
    this.dataServ.returnarrayWithDescription().subscribe((res: any) => {
      this.arrayWithDescription = res;
    });
  }
}
