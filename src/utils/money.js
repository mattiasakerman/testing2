import { FALLBACK_LOCALE, FALLBACK_CURRENCY } from "./consts";

export const format = (
  amount,
  { currency, locale } = {
    currency: FALLBACK_CURRENCY,
    locale: FALLBACK_LOCALE,
  }
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};
