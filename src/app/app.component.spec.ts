import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {BehaviorSubject} from 'rxjs/Rx';
import {CounterService} from './services/counter.service';

describe('AppComponent', () => {
  const counterServiceMock = {
    point: new BehaviorSubject(0),
    increment: () => void(0)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {provide: CounterService, useValue: counterServiceMock}
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should have point value`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    expect(app.point).toEqual(0);
  });

  it('should render point', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const pTag = compiled.querySelectorAll('p')[1];
    expect(pTag.textContent).toContain(`Point: 0`);
    const service = fixture.debugElement.injector.get(CounterService);
    service.point.next(3);
    fixture.detectChanges();
    expect(pTag.textContent).toContain(`Point: 3`);
  });

  it('should call increment', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const service = fixture.debugElement.injector.get(CounterService);
    spyOn(service, 'increment');
    const button = fixture.debugElement.nativeElement.querySelectorAll('button')[0];
    button.click();
    expect(service.increment).toHaveBeenCalledTimes(1);
    expect(service.increment).toHaveBeenCalledWith(3);
  });
});
