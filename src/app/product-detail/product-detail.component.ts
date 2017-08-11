import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product, ProductService, Comment} from "../shared/product.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  comments: Comment[];

  newRating: number = 5;
  newComment: string = "";

  isCommentHidden = true;
  constructor(private  routeInfo: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    let productId: number = this.routeInfo.snapshot.params["productId"];
    // this.product = this.productService.getProduct(productId);
    // 这里采取手工订阅流的方式。没有采用async自动订阅的原因是，模板中绑定product的地方特别多，如果用自动订阅，
    // 每个绑定product的地方都要加async，太麻烦。所以在控制器里手动订阅，把值传给本地product，模板不用更改
    this.productService.getProduct(productId).subscribe(
      product => this.product = product
    );
    // comments数组在模板中只绑定了一次，所以可以async自动订阅，但是由于下面addComment方法中用到unshift，reduce这些数组特有的方法，
    // 对comments自动订阅的话，就必须把它声明为流格式，就无法使用这些数组方法。所以也要手工订阅。
    // this.comments = this.productService.getCommentsForProductId(productId);
    this.productService.getCommentsForProductId(productId).subscribe(
      comments => this.comments = comments
    );
  }

  addComment() {
    let comment = new Comment(0, this.product.id, new Date().toISOString(), "someone", this.newRating, this.newComment);
    this.comments.unshift(comment);
    // 重新计算平均评分
    // reduce方法接收一个函数作为累加器，reduce遍历comments中的每个comment，有两个参数，第一个是匿名函数，第二个是初始值。
    // 这里sum初始值是0，comment是遍历comments的每个元素。匿名函数的结果就作为下一次遍历的sum值，最后得到所有评价的评分总和
    let sum = this.comments.reduce((sum, comment) => sum + comment.rating, 0);//
    this.product.rating = sum / this.comments.length;
    // 发表评论后清空评论区
    this.newComment = null;
    this.newRating = 5;
    this.isCommentHidden = true;
  }
}
