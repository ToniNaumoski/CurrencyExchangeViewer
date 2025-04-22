export interface CurrencyInfo {
  name: string;
  country: string;
}

export interface CurrencyDictionary {
  [code: string]: CurrencyInfo;
}

export interface LocaleTranslations {
  currencies: CurrencyDictionary;
  currency: {
    select: string;
    code: string;
    name: string;
    country: string;
  };
}