export interface CryptoCurrency {
  id: number;
  symbol: string;
  name: string;
  price: number;
  percentChange24h: number;
}

export interface FiatCurrency {
  id: string;
  symbol: string;
  name: string;
}

export interface Currency {
  id: string | number;
  symbol: string;
  name: string;
}

export interface ConversionResult {
  amount: number;
  fromCurrency: Currency;
  toCurrency: Currency;
  rate: number;
  result: number;
  timestamp: string;
}

export type ConversionType = 'crypto-to-fiat' | 'fiat-to-crypto';

export interface ConversionHistoryItem extends ConversionResult {
  id: string;
  conversionType: ConversionType;
}