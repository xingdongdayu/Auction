import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from "../shared/product.service";
import {FormControl} from "@angular/forms";
import 'rxjs/Rx';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private products: Product[];
  private imgUrl = 'http://placehold.it/320x150';
  private keyword: string
  private titleFilter: FormControl = new FormControl();
  constructor(private productService: ProductService) {
    this.titleFilter.valueChanges // 这就是流
      .debounceTime(500) // 当用户持续输入时不发射当前input的值，只有停止输入半秒以上时才发射到观察者函数中，提高用户体验。需要import 'rxjs/Rx'才起作用
      .subscribe(
        value => this.keyword = value // 将值保存到本地属性上
      );
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

}

