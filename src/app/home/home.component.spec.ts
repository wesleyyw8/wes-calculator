import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ HomeComponent ]
  //   })
  //   .compileComponents();

  //   fixture = TestBed.createComponent(HomeComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  describe('it should test the private functions', () => {

    it('should be a valid math expressions 1', () => {
      // @ts-expect-error
      expect(new HomeComponent().isValidMathExpression('3 + 2 + 4')).toBeTrue();
    });
    it('should be a valid math expressions 2', () => {
      // @ts-expect-error
      expect(new HomeComponent().isValidMathExpression('+2')).toBeTrue();
    });
    
    it('should be a valid math expressions 3', () => {
      // @ts-expect-error
      expect(new HomeComponent().isValidMathExpression('-2')).toBeTrue();
    });

    xit('should be a INVALID math expressions 4', () => {
      // @ts-expect-error
      expect(new HomeComponent().isValidMathExpression('3 + +')).toBeFalse();
    });

    xit('should be a INVALID math expressions 5', () => {
      // @ts-expect-error
      expect(new HomeComponent().isValidMathExpression('3+')).toBeFalse();
    });

    
    xit('should be a valid math expressions 4', () => {
      // @ts-expect-error
      expect(new HomeComponent().isValidMathExpression('sin(sin(30) + cos(20))')).toBeTrue();
    });

    xit('should be a valid math expressions', () => {
      // @ts-expect-error
      expect(new HomeComponent().isValidMathExpression('sin(30) + cos(20)')).toBeTrue();
    });












    // it('should be a invalid math expressions', () => {
    //   // @ts-expect-error
    //   expect(new HomeComponent().isValidMathExpression('sin(30')).toBeTrue();
    // });
  })
});
