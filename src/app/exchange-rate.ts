export class ExchangeRate {
    base_code: string;
    conversion_rates: {}
}

export interface Currency {
    id: string;
    eRates: string;
  }