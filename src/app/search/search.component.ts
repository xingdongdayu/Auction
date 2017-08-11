import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../shared/product.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  formModel: FormGroup;
  categories: string[];
  constructor(private productService: ProductService) {
    let fb = new FormBuilder();
    this.formModel = fb.group({
      title: ['', Validators.minLength(3)],
      price: [null, this.positiveNumberValidator],
      category: ['-1']
    });
  }

  ngOnInit() {
    this.categories = this.productService.getAllCategories();
  }
  positiveNumberValidator(control: FormControl):any {
    if(!control.value){
      return null;
    }
    let price = parseInt(control.value);
    if(price > 0){
      return null;
    }else{
      return {positiveNumber: true};
    }
  }
  onSearch(){
    if(this.formModel.valid){
      console.log(this.formModel.value);
      // 提交按钮被点击时发射service中定义的searchEvent事件，携带的数据是符合ProductSearchParams类定义的对象。
      // 表单里的值正好符合这个类定义，所以可以直接将表单值发射出去
      this.productService.searchEvent.emit(this.formModel.value);
    }
  }
}
