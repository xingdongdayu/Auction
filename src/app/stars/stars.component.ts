import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {
  @Input()
  private  rating: number = 0;
  @Output()
  private ratingChange: EventEmitter<number> = new EventEmitter();
  private  stars: boolean[];
  @Input()
  private readonly: boolean = true;
  constructor() { }

  ngOnInit() {
    // this.stars = [false,true,true,true,true];
    // 更新stars数组，更新星星显示的任务放到ngOnChanges里了，因为在运行ngOnInit前，ngOnChanges是会先运行一次的
    // this.stars = [];
    // for(let i = 1; i <= 5; i++){
    //   this.stars.push(i > this.rating);
    // }
  }
  // 当rating接到newRating的值时，显示的星星数量没有变化，这是因为stars数组没有更新。所以要用到ngOnChanges钩子，在rating值变化时，更新stars数组并更新星星显示
  ngOnChanges(changes: SimpleChanges): void {
    this.stars = [];
    for(let i = 1; i <= 5; i++){
      this.stars.push(i > this.rating);
    }
  }
  clickStar(index: number) {
    if(!this.readonly){
      this.rating = index + 1;
      // this.ngOnInit();// 根据新得到的rating值，确定显示多少个实心星星，多少个空心星星 //更新星星的任务放到ngOnChange中了，这里就不用在运行ngOnInit了，因为rating值变化后，会自动运行ngOnChanges
      this.ratingChange.emit(this.rating);
    }
  }
}
