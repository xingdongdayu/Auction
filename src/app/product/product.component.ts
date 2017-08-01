import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private products: Array<Product>;
  constructor() { }

  ngOnInit() {
    this.products = [
      new Product(1, "First Product", 1.99, 3.5, "This is the first product.", ["Electronic", "Hardware"]),
      new Product(2, "Second Product", 2.99, 2.5, "This is the second product.", ["Game", "Software"]),
      new Product(3, "Third Product", 3.99, 4.5, "This is the third product.", ["Electronic", "Hardware"]),
      new Product(4, "Fourth Product", 4.99, 1.5, "This is the fourth product.", ["Music", "Software"]),
      new Product(5, "Fifth Product", 5.99, 3.5, "This is the fifth product.", ["Electronic", "Hardware"]),
      new Product(6, "Sixth Product", 6.99, 2.5, "This is the sixth product.", ["Movie", "Software"])
    ];
    this.products.push(new Product(7, "Seventh Product", 7.99, 3.5, "This is the seventh product.", ["Electronic", "Hardware"]));
  }

}

export class Product {
  constructor(
    public id:number,
    public title:string,
    public price:number,
    public rating:number,
    public desc:string,
    public categories: Array<string>
  ) {}
}
