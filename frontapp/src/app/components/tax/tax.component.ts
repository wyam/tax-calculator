import { Component, OnInit } from '@angular/core';
import {Tax} from '../../models/tax';
import {TaxService} from '../../services/tax.service';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {

  tax: Tax = new Tax();
  errorMessage: string;

  constructor(
    private taxService: TaxService
  ) { }

  ngOnInit() {
  }

  calculateTax() {
    const payload = {
      income: this.tax.income,
      fullIncome: this.tax.fullIncome,
      superAnnuationRate: this.tax.superAnnuationRate,
    };
    this.taxService.calculateTax(payload)
      .subscribe(
        (taxResult) => {
          this.tax = {...this.tax, ...taxResult}
        },
        (error) => {
          this.errorMessage = 'some issue with calculation';
        }
      )
  }

}
