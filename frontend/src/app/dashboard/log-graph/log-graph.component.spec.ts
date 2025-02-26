import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogGraphComponent } from './log-graph.component';

describe('LogGraphComponent', () => {
  let component: LogGraphComponent;
  let fixture: ComponentFixture<LogGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
