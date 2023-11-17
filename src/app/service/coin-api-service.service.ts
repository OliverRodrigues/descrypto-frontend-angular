import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Coin } from '../model/coin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinApiServiceService {
  private apiUrl = 'https://pro-api.coingecko.com/api/v3/';

  constructor(private http: HttpClient) { }

  getCoinsData(): Observable<Coin[]> {
    return this.http.get<Coin[]>("https://api.coingecko.com/api/v3/coins/list?include_platform=true")
  }
}
