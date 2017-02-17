import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {BehaviorSubject} from 'rxjs/Rx';
import {CounterService} from './services/counter.service';

describe('HogeComponent', () => {
  const counterServiceMock = {point: new BehaviorSubject(0)};

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

  it(`should have as title 'app works!'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    expect(app.point).toEqual(0);
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('p')[1].textContent).toContain(`Point: 0`);
  });

  it('should call increment', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    spyOn(component, 'increment');
    const buttons: NodeListOf<HTMLButtonElement> = fixture.debugElement.nativeElement.querySelectorAll('button');
    buttons[0].click();
    expect(component.increment).toHaveBeenCalled();
  });

  it('should call asyncIncrement', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    spyOn(component, 'asyncIncrement');
    const buttons: NodeListOf<HTMLButtonElement> = fixture.debugElement.nativeElement.querySelectorAll('button');
    buttons[2].click();
    expect(component.asyncIncrement).toHaveBeenCalled();
  });
});
