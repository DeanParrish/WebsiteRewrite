import { Component, OnInit, AfterViewInit, ElementRef, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyResult } from './CurrencyList';
import { MatTableDataSource } from '@angular/material/table';
import { Chart } from 'chart.js';
import { Title  } from "@angular/platform-browser";

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit  {
  private _urlLatest = "http://data.fixer.io/api/latest?access_key=7dc5f63c9c54c7d04bdfb33691a41f23";
  private _urlDev = "http://data.fixer.io/api/";
  private _urlProd = "/currencydata/api/";
  private _currencyParams = "?access_key=7dc5f63c9c54c7d04bdfb33691a41f23";
  source: any;
  currencyList: any;
  @ViewChild('testChart', {static: false}) private chartRef; 
  currencyObjectList = [];
  historicalRateArray = [];
  historicalDateArray = [];
  historicalDate: any = null;
  historicalCurrency: string = null;
  convertCurrencyFrom: string = null;
  convertCurrencyTo: string = null;
  convertAmount: number = 0;
  convertResult: string;
  currentAction: string;
  chart: any;
  displayedColumns: string[] = ['currency', 'value'];
  currencyDetails: any = [{"iso":"AED","currencyText":"United Arab Emirates Dirham"},{"iso":"AFN","currencyText":"Afghanistan Afghani"},{"iso":"ALL","currencyText":"Albania Lek"},{"iso":"AMD","currencyText":"Armenia Dram"},{"iso":"ANG","currencyText":"Netherlands Antilles Guilder"},{"iso":"AOA","currencyText":"Angola Kwanza"},{"iso":"ARS","currencyText":"Argentina Peso"},{"iso":"AUD","currencyText":"Australia Dollar"},{"iso":"AWG","currencyText":"Aruba Guilder"},{"iso":"AZN","currencyText":"Azerbaijan Manat"},{"iso":"BAM","currencyText":"Bosnia and Herzegovina Convertible Marka"},{"iso":"BBD","currencyText":"Barbados Dollar"},{"iso":"BDT","currencyText":"Bangladesh Taka"},{"iso":"BGN","currencyText":"Bulgaria Lev"},{"iso":"BHD","currencyText":"Bahrain Dinar"},{"iso":"BIF","currencyText":"Burundi Franc"},{"iso":"BMD","currencyText":"Bermuda Dollar"},{"iso":"BND","currencyText":"Brunei Darussalam Dollar"},{"iso":"BOB","currencyText":"Bolivia Bolíviano"},{"iso":"BRL","currencyText":"Brazil Real"},{"iso":"BSD","currencyText":"Bahamas Dollar"},{"iso":"BTN","currencyText":"Bhutan Ngultrum"},{"iso":"BWP","currencyText":"Botswana Pula"},{"iso":"BYN","currencyText":"Belarus Ruble"},{"iso":"BZD","currencyText":"Belize Dollar"},{"iso":"CAD","currencyText":"Canada Dollar"},{"iso":"CDF","currencyText":"Congo/Kinshasa Franc"},{"iso":"CHF","currencyText":"Switzerland Franc"},{"iso":"CLP","currencyText":"Chile Peso"},{"iso":"CNY","currencyText":"China Yuan Renminbi"},{"iso":"COP","currencyText":"Colombia Peso"},{"iso":"CRC","currencyText":"Costa Rica Colon"},{"iso":"CUC","currencyText":"Cuba Convertible Peso"},{"iso":"CUP","currencyText":"Cuba Peso"},{"iso":"CVE","currencyText":"Cape Verde Escudo"},{"iso":"CZK","currencyText":"Czech Republic Koruna"},{"iso":"DJF","currencyText":"Djibouti Franc"},{"iso":"DKK","currencyText":"Denmark Krone"},{"iso":"DOP","currencyText":"Dominican Republic Peso"},{"iso":"DZD","currencyText":"Algeria Dinar"},{"iso":"EGP","currencyText":"Egypt Pound"},{"iso":"ERN","currencyText":"Eritrea Nakfa"},{"iso":"ETB","currencyText":"Ethiopia Birr"},{"iso":"EUR","currencyText":"Euro Member Countries"},{"iso":"FJD","currencyText":"Fiji Dollar"},{"iso":"FKP","currencyText":"Falkland Islands (Malvinas) Pound"},{"iso":"GBP","currencyText":"United Kingdom Pound"},{"iso":"GEL","currencyText":"Georgia Lari"},{"iso":"GGP","currencyText":"Guernsey Pound"},{"iso":"GHS","currencyText":"Ghana Cedi"},{"iso":"GIP","currencyText":"Gibraltar Pound"},{"iso":"GMD","currencyText":"Gambia Dalasi"},{"iso":"GNF","currencyText":"Guinea Franc"},{"iso":"GTQ","currencyText":"Guatemala Quetzal"},{"iso":"GYD","currencyText":"Guyana Dollar"},{"iso":"HKD","currencyText":"Hong Kong Dollar"},{"iso":"HNL","currencyText":"Honduras Lempira"},{"iso":"HRK","currencyText":"Croatia Kuna"},{"iso":"HTG","currencyText":"Haiti Gourde"},{"iso":"HUF","currencyText":"Hungary Forint"},{"iso":"IDR","currencyText":"Indonesia Rupiah"},{"iso":"ILS","currencyText":"Israel Shekel"},{"iso":"IMP","currencyText":"Isle of Man Pound"},{"iso":"INR","currencyText":"India Rupee"},{"iso":"IQD","currencyText":"Iraq Dinar"},{"iso":"IRR","currencyText":"Iran Rial"},{"iso":"ISK","currencyText":"Iceland Krona"},{"iso":"JEP","currencyText":"Jersey Pound"},{"iso":"JMD","currencyText":"Jamaica Dollar"},{"iso":"JOD","currencyText":"Jordan Dinar"},{"iso":"JPY","currencyText":"Japan Yen"},{"iso":"KES","currencyText":"Kenya Shilling"},{"iso":"KGS","currencyText":"Kyrgyzstan Som"},{"iso":"KHR","currencyText":"Cambodia Riel"},{"iso":"KMF","currencyText":"Comorian Franc"},{"iso":"KPW","currencyText":"Korea (North) Won"},{"iso":"KRW","currencyText":"Korea (South) Won"},{"iso":"KWD","currencyText":"Kuwait Dinar"},{"iso":"KYD","currencyText":"Cayman Islands Dollar"},{"iso":"KZT","currencyText":"Kazakhstan Tenge"},{"iso":"LAK","currencyText":"Laos Kip"},{"iso":"LBP","currencyText":"Lebanon Pound"},{"iso":"LKR","currencyText":"Sri Lanka Rupee"},{"iso":"LRD","currencyText":"Liberia Dollar"},{"iso":"LSL","currencyText":"Lesotho Loti"},{"iso":"LYD","currencyText":"Libya Dinar"},{"iso":"MAD","currencyText":"Morocco Dirham"},{"iso":"MDL","currencyText":"Moldova Leu"},{"iso":"MGA","currencyText":"Madagascar Ariary"},{"iso":"MKD","currencyText":"Macedonia Denar"},{"iso":"MMK","currencyText":"Myanmar (Burma) Kyat"},{"iso":"MNT","currencyText":"Mongolia Tughrik"},{"iso":"MOP","currencyText":"Macau Pataca"},{"iso":"MRU","currencyText":"Mauritania Ouguiya"},{"iso":"MUR","currencyText":"Mauritius Rupee"},{"iso":"MVR","currencyText":"Maldives (Maldive Islands) Rufiyaa"},{"iso":"MWK","currencyText":"Malawi Kwacha"},{"iso":"MXN","currencyText":"Mexico Peso"},{"iso":"MYR","currencyText":"Malaysia Ringgit"},{"iso":"MZN","currencyText":"Mozambique Metical"},{"iso":"NAD","currencyText":"Namibia Dollar"},{"iso":"NGN","currencyText":"Nigeria Naira"},{"iso":"NIO","currencyText":"Nicaragua Cordoba"},{"iso":"NOK","currencyText":"Norway Krone"},{"iso":"NPR","currencyText":"Nepal Rupee"},{"iso":"NZD","currencyText":"New Zealand Dollar"},{"iso":"OMR","currencyText":"Oman Rial"},{"iso":"PAB","currencyText":"Panama Balboa"},{"iso":"PEN","currencyText":"Peru Sol"},{"iso":"PGK","currencyText":"Papua New Guinea Kina"},{"iso":"PHP","currencyText":"Philippines Peso"},{"iso":"PKR","currencyText":"Pakistan Rupee"},{"iso":"PLN","currencyText":"Poland Zloty"},{"iso":"PYG","currencyText":"Paraguay Guarani"},{"iso":"QAR","currencyText":"Qatar Riyal"},{"iso":"RON","currencyText":"Romania Leu"},{"iso":"RSD","currencyText":"Serbia Dinar"},{"iso":"RUB","currencyText":"Russia Ruble"},{"iso":"RWF","currencyText":"Rwanda Franc"},{"iso":"SAR","currencyText":"Saudi Arabia Riyal"},{"iso":"SBD","currencyText":"Solomon Islands Dollar"},{"iso":"SCR","currencyText":"Seychelles Rupee"},{"iso":"SDG","currencyText":"Sudan Pound"},{"iso":"SEK","currencyText":"Sweden Krona"},{"iso":"SGD","currencyText":"Singapore Dollar"},{"iso":"SHP","currencyText":"Saint Helena Pound"},{"iso":"SLL","currencyText":"Sierra Leone Leone"},{"iso":"SOS","currencyText":"Somalia Shilling"},{"iso":"SPL","currencyText":"Seborga Luigino"},{"iso":"SRD","currencyText":"Suriname Dollar"},{"iso":"STN","currencyText":"São Tomé and Príncipe Dobra"},{"iso":"SVC","currencyText":"El Salvador Colon"},{"iso":"SYP","currencyText":"Syria Pound"},{"iso":"SZL","currencyText":"eSwatini Lilangeni"},{"iso":"THB","currencyText":"Thailand Baht"},{"iso":"TJS","currencyText":"Tajikistan Somoni"},{"iso":"TMT","currencyText":"Turkmenistan Manat"},{"iso":"TND","currencyText":"Tunisia Dinar"},{"iso":"TOP","currencyText":"Tonga Pa'anga"},{"iso":"TRY","currencyText":"Turkey Lira"},{"iso":"TTD","currencyText":"Trinidad and Tobago Dollar"},{"iso":"TVD","currencyText":"Tuvalu Dollar"},{"iso":"TWD","currencyText":"Taiwan New Dollar"},{"iso":"TZS","currencyText":"Tanzania Shilling"},{"iso":"UAH","currencyText":"Ukraine Hryvnia"},{"iso":"UGX","currencyText":"Uganda Shilling"},{"iso":"USD","currencyText":"United States Dollar"},{"iso":"UYU","currencyText":"Uruguay Peso"},{"iso":"UZS","currencyText":"Uzbekistan Som"},{"iso":"VEF","currencyText":"Venezuela Bolívar"},{"iso":"VND","currencyText":"Viet Nam Dong"},{"iso":"VUV","currencyText":"Vanuatu Vatu"},{"iso":"WST","currencyText":"Samoa Tala"},{"iso":"XAF","currencyText":"Communauté Financière Africaine (BEAC) CFA Franc BEAC"},{"iso":"XCD","currencyText":"East Caribbean Dollar"},{"iso":"XDR","currencyText":"International Monetary Fund (IMF) Special Drawing Rights"},{"iso":"XPF","currencyText":"Comptoirs Français du Pacifique (CFP) Franc"},{"iso":"YER","currencyText":"Yemen Rial"},{"iso":"ZAR","currencyText":"South Africa Rand"},{"iso":"ZMW","currencyText":"Zambia Kwacha"},{"iso":"ZWD","currencyText":"Zimbabwe Dollar"},{"iso":"BTC","currencyText":"Bitcoin"},{"iso":"BYR","currencyText":"Belarusian Ruble"},{"iso":"CLF","currencyText":"Chilean Unit of Account"},{"iso":"LTL","currencyText":"Lithuanian litas"},{"iso":"LVL","currencyText":"Latvian lats"},{"iso":"MRO","currencyText":"Mauritanian Ouguiya"},{"iso":"STD","currencyText":"São Tomé and Príncipe dobra"},{"iso":"XAG","currencyText":"Silver Ounce"},{"iso":"XAU","currencyText":"Gold Ounce"},{"iso":"XOF","currencyText":"West African CFA franc"},{"iso":"ZMK","currencyText":"Zambian Kwacha"},{"iso":"ZWL","currencyText":"Zimbabwean dollar"}];

  constructor(private httpClient: HttpClient,private elementRef: ElementRef,private titleService: Title) { 
    this.currentAction = "latest";
    this.httpClient.get<CurrencyResult>(this._urlProd + this.currentAction + this._currencyParams)//urlLatest for local; proxy for server use since can't use SSL for this
      .subscribe(res => {  
        this.currencyList = res;
        console.log(res);
        for(var i in this.currencyList.rates){
          var rateObj:any = {};
          rateObj.currency = i;
          rateObj.value = this.currencyList.rates[i];
          for(var x in this.currencyDetails){
            if (this.currencyDetails[x].iso != i){
              continue;
            }else{
              rateObj.currencyText = i + " - " + this.currencyDetails[x].currencyText;
            }
          }
          if(!rateObj.currencyText){
            rateObj.currencyText = i;
          }
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


      this.httpClient.get<CurrencyResult>(this._urlProd + parsedDate + this._currencyParams + "&symbols=" + val)
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
      this.httpClient.get<CurrencyResult>(this._urlProd + parsedDate + this._currencyParams + "&symbols=" + this.historicalCurrency)
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
