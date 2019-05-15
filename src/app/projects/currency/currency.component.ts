import { Component, OnInit, AfterViewInit, ElementRef, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyResult } from './CurrencyList';
import { MatTableDataSource } from '@angular/material';
import { Chart } from 'chart.js';
import { Title  } from "@angular/platform-browser";

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit  {
  private _urlLatest = "http://data.fixer.io/api/latest?access_key=7dc5f63c9c54c7d04bdfb33691a41f23";

  //currencyList = new MatTableDataSource();
  source: any;
  currencyList: any;
  @ViewChild('testChart') private chartRef; 
  currencyObjectList = [];
  historicalRateArray = [];
  historicalDateArray = [];
  historicalDate: any = null;
  historicalCurrency: string = null;
  convertCurrencyFrom: string = null;
  convertCurrencyTo: string = null;
  convertAmount: number = 0;
  convertResult: string;
  chart: any;
  displayedColumns: string[] = ['currency', 'value'];

  constructor(private httpClient: HttpClient,private elementRef: ElementRef,private titleService: Title) { 
    this.httpClient.get<CurrencyResult>(this._urlLatest)
      .subscribe(res => {  
        this.currencyList = res;
        for(var i in this.currencyList.rates){
          var rateObj:any = {};
          rateObj.currency = i;
          rateObj.value = this.currencyList.rates[i];
          this.currencyObjectList.push(rateObj);
        }
        this.source = new MatTableDataSource(this.currencyObjectList);
      });

      this.titleService.setTitle("Dean Parrish - Currency Conversion")

  }

  ngOnInit() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.historicalDateArray,
        datasets: [
          { 
            data: this.historicalRateArray,
            borderColor: "#3cba9f",
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  currencyHistoryChange(val){
    if(this.historicalDate != null){
      //get historcal point selected, then compare to today's value
      let dateSelected = new Date(this.historicalDate);
      console.log(this.historicalDate + "---> " + dateSelected);
      let month = ((dateSelected.getMonth()+1) < 10) ? "0" + (dateSelected.getMonth()+1) : (dateSelected.getMonth()+1);
      let day = (dateSelected.getDate() < 10) ? "0" + (dateSelected.getDate()) : dateSelected.getDate();
      let parsedDate = dateSelected.getFullYear() + "-" + month + "-" + day;
      console.log(parsedDate);
      let urlhistorical = "http://data.fixer.io/api/" + parsedDate + "?access_key=7dc5f63c9c54c7d04bdfb33691a41f23&symbols=" + val;

      this.httpClient.get<CurrencyResult>(urlhistorical)
        .subscribe(res => { 
          console.log(res);
          console.log(this.currencyObjectList)
          console.log(this.currencyList);
          this.historicalDateArray = [];
          this.historicalRateArray = [];
          this.historicalDateArray.push(res.date)
          for(var i in res.rates){
            this.historicalRateArray.push(res.rates[i]);
          }
          this.historicalDateArray.push(this.currencyList.date);
          this.historicalRateArray.push(this.currencyList.rates[this.historicalCurrency])
          this.chart.data.datasets[0].data = this.historicalRateArray;
          this.chart.data.labels = this.historicalDateArray;
          console.log(this.historicalDateArray);
          console.log(this.historicalRateArray)
          this.chart.update();
        })
    }    
  }
  currencyHistoryDateChange(){
    if(this.historicalCurrency != null){
      //get historcal point selected, then compare to today's value
      let dateSelected = new Date(this.historicalDate);
      console.log(this.historicalDate + "---> " + dateSelected);
      let month = ((dateSelected.getMonth()+1) < 10) ? "0" + (dateSelected.getMonth()+1) : (dateSelected.getMonth()+1);
      let day = (dateSelected.getDate() < 10) ? "0" + (dateSelected.getDate()) : dateSelected.getDate();
      let parsedDate = dateSelected.getFullYear() + "-" + month + "-" + day;
      console.log(parsedDate);
      let urlhistorical = "http://data.fixer.io/api/" + parsedDate + "?access_key=7dc5f63c9c54c7d04bdfb33691a41f23&symbols=" + this.historicalCurrency;
      this.httpClient.get<CurrencyResult>(urlhistorical)
      .subscribe(res => { 
        console.log(res);
        console.log(this.currencyObjectList)
        console.log(this.currencyList);
        this.historicalDateArray = [];
        this.historicalRateArray = [];
        this.historicalDateArray.push(res.date)
        for(var i in res.rates){
          this.historicalRateArray.push(res.rates[i]);
        }
        this.historicalDateArray.push(this.currencyList.date);
        this.historicalRateArray.push(this.currencyList.rates[this.historicalCurrency])
        this.chart.data.datasets[0].data = this.historicalRateArray;
        this.chart.data.labels = this.historicalDateArray;
        console.log(this.historicalDateArray);
        console.log(this.historicalRateArray)
        this.chart.update();
      })
    }
  }

  convertCurrency(){
    console.log(this.convertCurrencyFrom);
    console.log(this.convertCurrencyTo);
    console.log(this.convertAmount);
    if(this.convertCurrencyFrom != null && this.convertCurrencyTo != null){
      let currencyFromEuroValue = 1/this.currencyList.rates[this.convertCurrencyFrom];
      let result = ((currencyFromEuroValue*this.convertAmount) * this.currencyList.rates[this.convertCurrencyTo]).toFixed(2);
      this.convertResult = this.convertAmount.toString() + " " + this.convertCurrencyFrom + " converts to " + result + " " + this.convertCurrencyTo;
    }else{
      this.convertResult = "Enter a currency to convert"
    }
    
  }
}
