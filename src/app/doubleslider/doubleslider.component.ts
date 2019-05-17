import { Component } from '@angular/core';

@Component({
  selector: 'doubleslider',
  templateUrl: 'doubleslider.component.html',
  styleUrls: ['doubleslider.component.css']
})
export class DoubleSlider {
  startRangevalue: number = 1;
  rangeslideData = { range_start: 1, range_end: 5 };
}