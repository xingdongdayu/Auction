import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {
  // 假设这里是从数据库获取到的数据
  private products: Product[] = [
    new Product(1, "First Product", 1.99, 3.5, "This is the first product.", ["Electronic", "Hardware"]),
    new Product(2, "Second Product", 2.99, 2.5, "This is the second product.", ["Game", "Software"]),
    new Product(3, "Third Product", 3.99, 4.0, "This is the third product.", ["Electronic", "Hardware"]),
    new Product(4, "Fourth Product", 4.99, 1.5, "This is the fourth product.", ["Music", "Software"]),
    new Product(5, "Fifth Product", 5.99, 3.5, "This is the fifth product.", ["Electronic", "Hardware"]),
    new Product(6, "Sixth Product", 6.99, 2.5, "This is the sixth product.", ["Movie", "Software"])
  ];
  private comments: Comment[] = [
    new Comment(1, 1, "2017-02-02 22:22:22", "Dong", 3, "Not bad"),
    new Comment(2, 1, "2017-02-02 22:22:22", "Jiarun", 4, "Good"),
    new Comment(3, 1, "2017-02-02 22:22:22", "Ryan", 2, "Not like"),
    new Comment(4, 2, "2017-02-02 22:22:22", "Elva", 3, "OK")
  ]
  // this.products.push(new Product(7, "Seventh Product", 7.99, 3.5, "This is the seventh product.", ["Electronic", "Hardware"]));
  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }
  getProduct(id: number): Product {
    return this.products.find((p) => p.id == id);
  }
  getCommentsForProductId(id:number): Comment[] {
    // 过滤每个评论，当发现这个评论的productId和传入的参数Id相等，则取出
    return this.comments.filter((c: Comment) => c.productId == id);
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
export class Comment {
  constructor(
    public id:number,
    public productId:number,
    public timestamp:string,
    public user:string,
    public rating:number,
    public content:string
  ) {}
}
