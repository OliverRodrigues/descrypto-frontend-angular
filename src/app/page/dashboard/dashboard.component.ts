import { CoinApiServiceService } from './../../service/coin-api-service.service';
// dashboard.component.ts

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Coin } from 'src/app/model/coin.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  coinsData: Coin[] = [];
  filteredCoins: any[] = [];
  searchControl: FormControl = new FormControl('');
  dataSource: MatTableDataSource<Coin>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private coinApiService: CoinApiServiceService) {
    this.dataSource = new MatTableDataSource(this.coinsData);
  }

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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
