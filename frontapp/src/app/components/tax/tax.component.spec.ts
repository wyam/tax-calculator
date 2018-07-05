import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxComponent } from './tax.component';
import {Observable} from 'rxjs/Rx';
import {TaxService} from '../../services/tax.service';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatInputModule, MatListModule} from '@angular/material';
import { HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('TestComponent', () => {
  let taxService;
  let component: TaxComponent;
  let fixture: ComponentFixture<TaxComponent>;
  let TAX_MOCK_RESULT = {
    superAnnuation: 9500,
    gross: 100000,
    grossAndSuper: 109500,
    taxAmount: 24632,
    netAmount: 75368,
    netTotalAmount: 84868
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, FormsModule, MatInputModule, MatButtonModule, MatListModule, HttpClientModule ],
      declarations: [ TaxComponent ],
      providers: [ TaxService ]
    })
    component = TestBed.createComponent(TaxComponent).componentInstance;
    taxService = TestBed.get(TaxService);
    spyOn(taxService, 'calculateTax').and.returnValue(Observable.of(TAX_MOCK_RESULT));

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call taxService api on submit', () => {
    const tax = {
      income: 100000,
      fullIncome: 109500,
      superAnnuationRate: 9.5
    };
    component.tax = tax;
    component.calculateTax();
    expect(taxService.calculateTax).toHaveBeenCalled();
    expect(component.tax).toEqual({
      income: 100000,
      fullIncome: 109500,
      superAnnuationRate: 9.5,
      superAnnuation: 9500,
      gross: 100000,
      grossAndSuper: 109500,
      taxAmount: 24632,
      netAmount: 75368,
      netTotalAmount: 84868
    });
  });
});
