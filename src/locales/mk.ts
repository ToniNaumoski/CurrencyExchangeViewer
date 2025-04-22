import type { LocaleTranslations } from '../types/locale';

const mk: LocaleTranslations = {
  // currencies: {
  //     USD: { name: "Американски долар", country: "САД" },
  //     EUR: { name: "Евро", country: "Европска Унија" },
  //     JPY: { name: "Јапонски јен", country: "Јапонија" },
  //     GBP: { name: "Британска фунта", country: "Обединето Кралство" },
  //     AUD: { name: "Австралиски долар", country: "Австралија" },
  //     CAD: { name: "Канадски долар", country: "Канада" },
  //     CHF: { name: "Швајцарски франк", country: "Швајцарија" },
  //     CNY: { name: "Кинески јуан", country: "Кина" },
  //     SEK: { name: "Шведска круна", country: "Шведска" },
  //     NZD: { name: "Новозеландски долар", country: "Нов Зеланд" },
  //     MXN: { name: "Мексикански пезос", country: "Мексико" },
  //     SGD: { name: "Сингапурски долар", country: "Сингапур" },
  //     HKD: { name: "Хонгконшки долар", country: "Хонг Конг" },
  //     NOK: { name: "Норвешка круна", country: "Норвешка" },
  //     KRW: { name: "Јужнокорејски вон", country: "Јужна Кореја" },
  //     INR: { name: "Индиска рупија", country: "Индија" },
  //     RUB: { name: "Руска рубља", country: "Русија" },
  //     ZAR: { name: "Јужноафрички ранд", country: "Јужна Африка" },
  //     TRY: { name: "Турска лира", country: "Турција" },
  //     BRL: { name: "Бразилски реал", country: "Бразил" }
  // },
  currencies: {
    AUD: { name: "Австралиски долар", country: "Австралија" },
    BGN: { name: "Бугарски лев", country: "Бугарија" },
    BRL: { name: "Бразилски реал", country: "Бразил" },
    CAD: { name: "Канадски долар", country: "Канада" },
    CHF: { name: "Швајцарски франк", country: "Швајцарија" },
    CNY: { name: "Кинески јуан", country: "Кина" },
    CZK: { name: "Чешка круна", country: "Чешка" },
    DKK: { name: "Данска круна", country: "Данска" },
    EUR: { name: "Евро", country: "Европска Унија" },
    GBP: { name: "Британска фунта", country: "Обединето Кралство" },
    HKD: { name: "Хонгконшки долар", country: "Хонг Конг" },
    JPY: { name: "Јапонски јен", country: "Јапонија" },
    KRW: { name: "Јужнокорејски вон", country: "Јужна Кореја" },
    MXN: { name: "Мексиканско пезо", country: "Мексико" },
    NOK: { name: "Норвешка круна", country: "Норвешка" },
    NZD: { name: "Новозеландски долар", country: "Нов Зеланд" },
    SEK: { name: "Шведска круна", country: "Шведска" },
    SGD: { name: "Сингапурски долар", country: "Сингапур" },
    USD: { name: "Американски долар", country: "Соединети Американски Држави" },
    ZAR: { name: "Јужноафрикански ранд", country: "Јужна Африка" }
  },
  currency: {
    select: "Избери валута",
    code: "Код",
    name: "Име на валута",
    country: "Држава"
  },
  pickDate:"Избери валута",
  baseCurrency:"основна валута",
  dateRange: "Опсег на датуми: 15–18 април 2025 година",
  currencyExchageRatesBaseEuro: 'Курсеви на девизи (основна валута: EUR)'

};

export default mk;

// export default {
//     currencies: {
//       USD: { name: "Американски долар", country: "САД" },
//       EUR: { name: "Евро", country: "Европска Унија" },
//       JPY: { name: "Јапонски јен", country: "Јапонија" },
//       GBP: { name: "Британска фунта", country: "Обединето Кралство" },
//       AUD: { name: "Австралиски долар", country: "Австралија" },
//       CAD: { name: "Канадски долар", country: "Канада" },
//       CHF: { name: "Швајцарски франк", country: "Швајцарија" },
//       CNY: { name: "Кинески јуан", country: "Кина" },
//       SEK: { name: "Шведска круна", country: "Шведска" },
//       NZD: { name: "Новозеландски долар", country: "Нов Зеланд" },
//       MXN: { name: "Мексикански пезос", country: "Мексико" },
//       SGD: { name: "Сингапурски долар", country: "Сингапур" },
//       HKD: { name: "Хонгконшки долар", country: "Хонг Конг" },
//       NOK: { name: "Норвешка круна", country: "Норвешка" },
//       KRW: { name: "Јужнокорејски вон", country: "Јужна Кореја" },
//       INR: { name: "Индиска рупија", country: "Индија" },
//       RUB: { name: "Руска рубља", country: "Русија" },
//       ZAR: { name: "Јужноафрички ранд", country: "Јужна Африка" },
//       TRY: { name: "Турска лира", country: "Турција" },
//       BRL: { name: "Бразилски реал", country: "Бразил" }
//     },
//     currency: {
//       select: "Избери валута",
//       code: "Код",
//       name: "Име на валута",
//       country: "Држава"
//     }
//   }