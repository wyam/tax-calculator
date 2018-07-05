import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tax } from '../models/tax';

@Injectable()
export class TaxService {

  constructor(private http: HttpClient) {}

  calculateTax(taxDetail): Observable<any> {
    const url = `${environment.url}/tax`;
    return this.http.post<Tax>(url, taxDetail);
  }
}
