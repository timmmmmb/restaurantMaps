import { Component,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'doubleslider',
  templateUrl: 'doubleslider.component.html',
  styleUrls: ['doubleslider.component.css']
})


export class DoubleSlider {
  @Output()
    public emit = new EventEmitter();
  stars:Star[] = [new Star(1,true),new Star(2,true),new Star(3,true),new Star(4,true),new Star(5,true)];
  private click(value:number){
    this.stars[value-1].selected = !this.stars[value-1].selected;
    this.emit.emit(this.stars);
  }
}

export
class Star{
  constructor(public value:number, public selected:boolean){

  }
}