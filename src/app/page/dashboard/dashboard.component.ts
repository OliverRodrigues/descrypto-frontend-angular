import { CoinApiServiceService } from './../../service/coin-api-service.service';
// dashboard.component.ts

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Coin } from 'src/app/model/coin.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
getCoinInfo($event: any) {
throw new Error('Method not implemented.');
}
  coinsData: Coin[] = [];
  filteredCoins: any[] = [];
  searchControl: FormControl = new FormControl('');

  constructor(private coinApiService: CoinApiServiceService) {}

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
      console.log(data);
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
