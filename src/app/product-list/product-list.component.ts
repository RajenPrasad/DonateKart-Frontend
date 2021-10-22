import { Component, Input, OnInit } from '@angular/core';
import { Currency } from '../exchange-rate';
import { ExchangeRateService } from '../exchange-rate.service';
import { Product, products } from '../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  originalProducts: Product[] = products;
  selectedCurrencyModel: string;
  currencies: string[] = ['INR','USD'];
  exchangeRates: Currency[];
  currentER : number = 1;
  constructor(private apiService: ExchangeRateService ) { 
  }

  ngOnInit() {
    this.getExchangeRates();
    this.selectedCurrencyModel = this.currencies[0];
  }

  getExchangeRates() {
    this.apiService
    .getExchangeRate()
    .subscribe( response => {
      if(response){
        const mapped = Object.keys(response.conversion_rates).map(key => ({id: key, eRates: response.conversion_rates[key]})).filter(t => t.id == 'INR' || t.id == 'USD');
        this.exchangeRates = mapped;
      }
    },
    error => {
      this.exchangeRates = [];
    });
  }

  updateProductPrice(event){
      if(this.exchangeRates){
       for (let i = 0; i < this.exchangeRates.length; i++) {
         if(this.exchangeRates[i].id == event.value){
           this.currentER = Number(this.exchangeRates[i].eRates);
         }
       }
    }
  }
}
