// This is how vue-i18n expects your messages to be typed
export interface CurrencyInfo {
  name: string;
  country: string;
}

export interface CurrencyMessages {
  currencies: {
    [code: string]: CurrencyInfo;
  };
  currency: {
    select: string;
    code: string;
    name: string;
    country: string;
  };
}

// Make it compatible with vue-i18n's LocaleMessage type
export interface LocaleTranslations extends Record<string, any> {
  currencies: {
    [code: string]: CurrencyInfo;
  };
  currency: {
    select: string;
    code: string;
    name: string;
    country: string;
  };
  pickDate:string;
}