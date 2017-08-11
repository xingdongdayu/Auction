import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class ProductService {
  // // 假设这里是从数据库获取到的数据
  // private products: Product[] = [
  //   new Product(1, "First Product", 1.99, 3.5, "This is the first product.", ["Electronic", "Hardware"]),
  //   new Product(2, "Second Product", 2.99, 2.5, "This is the second product.", ["Game", "Software"]),
  //   new Product(3, "Third Product", 3.99, 4.0, "This is the third product.", ["Electronic", "Hardware"]),
  //   new Product(4, "Fourth Product", 4.99, 1.5, "This is the fourth product.", ["Music", "Software"]),
  //   new Product(5, "Fifth Product", 5.99, 3.5, "This is the fifth product.", ["Electronic", "Hardware"]),
  //   new Product(6, "Sixth Product", 6.99, 2.5, "This is the sixth product.", ["Movie", "Software"])
  // ];
  // private comments: Comment[] = [
  //   new Comment(1, 1, "2017-02-02 22:22:22", "Dong", 3, "Not bad"),
  //   new Comment(2, 1, "2017-02-02 22:22:22", "Jiarun", 4, "Good"),
  //   new Comment(3, 1, "2017-02-02 22:22:22", "Ryan", 2, "Not like"),
  //   new Comment(4, 2, "2017-02-02 22:22:22", "Elva", 3, "OK")
  // ];
  // this.products.push(new Product(7, "Seventh Product", 7.99, 3.5, "This is the seventh product.", ["Electronic", "Hardware"]));
  // constructor() { }

  // getProducts(): Product[] {
  //   return this.products;
  // }
  // getProduct(id: number): Product {
  //   return this.products.find((p) => p.id == id);
  // }
  // getCommentsForProductId(id:number): Comment[] {
  //   // 过滤每个评论，当发现这个评论的productId和传入的参数Id相等，则取出
  //   return this.comments.filter((c: Comment) => c.productId == id);
  // }
  getAllCategories(): string[] {
    return ["Electronic", "Hardware", "Game", "Software", "Movie"];
  }

  // 改造代码，从http服务器获取数据
  constructor(private http: Http){}

  getProducts(): Observable<Product[]>{
    return this.http.get("/api/products").map(res => res.json());
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get("/api/product/"+id).map(res => res.json());
  }
  getCommentsForProductId(id: number): Observable<Comment[]> {
    return this.http.get("/api/product/"+id+"/comments").map(res => res.json());
  }

  // 以本服务为中间人，负责搜索组件和商品列表组件间通讯
  // get方法第二个参数options类型是RequestOptionsArgs，这个类型的search属性值类型是URLSearchParams，所以写个方法encodeParams将传入的参数变成URLSearchParams类型
  search(params: ProductSearchParams): Observable<Product[]> {
    // console.log("search: "+this.encodeParams(params).toString());
    // return this.http.get("/api/products", {search: this.encodeParams(params)}).map(res => res.json());
    // 我这里必须把参数toString才能正确获得结果，但是教程中并没有toString，而且看这里的用法应该也确实不需要toString。原因未知。。。
    return this.http.get("/api/products", {search: this.encodeParams(params).toString()}).map(res => res.json());
  }

  private encodeParams(params: ProductSearchParams) {
    let result: URLSearchParams;
    result = Object.keys(params) // Object.key方法将对象params的所有属性变成一个集合
      .filter(key => params[key]) // 保留有值的属性，去除没有值的属性
      .reduce((sum: URLSearchParams, key: string) => { // reduce方法第一个参数是匿名函数定义的累加器，遍历集合中的元素，以累加器指定的方式累加
        sum.append(key, params[key]); // append是URLSearchParams类的方法，作用是将参数自动按key1=value1&key2=value2这种方式附加到一起，组成queryString。用set方法得到的效果好像一样
        return sum;
      }, new URLSearchParams());
    return result;
  }
  // 定义搜索事件流，search组件的点击提交按钮会发射这个事件流
  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();
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

export class ProductSearchParams {
  constructor(
    public title: string,
    public price: number,
    public category: string
  ) {}
}
