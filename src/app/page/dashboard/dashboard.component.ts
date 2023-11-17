// dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  coinsData: any[] = [];
  filteredCoins: any[] = [];
  searchControl: FormControl = new FormControl('');

  constructor(private coinApiService: CoinApiService) { }

  ngOnInit(): void {
    this.getCoinData();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          return this.filterCoins(value);
        })
      )
      .subscribe((filteredData: any) => {
        this.filteredCoins = filteredData;
      });
  }

  getCoinData(): void {
    this.coinApiService.getCoinsData().subscribe((data: any) => {
      this.coinsData = data;
      this.filteredCoins = data;
    });
  }

  filterCoins(value: string): any {
    // Lógica para filtrar os dados com base no valor do input de pesquisa
    return this.coinsData.filter((coin: any) => {
      return coin.name.toLowerCase().includes(value.toLowerCase());
    });
  }
}
