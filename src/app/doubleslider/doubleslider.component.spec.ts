import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoublesliderComponent } from './doubleslider.component';

describe('DoublesliderComponent', () => {
  let component: DoublesliderComponent;
  let fixture: ComponentFixture<DoublesliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoublesliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoublesliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
