import store from "@/store";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

const filters = {
  dateFilter(value, format = "date") {
    const options = {};
    if (format.includes("date")) {
      options.day = "2-digit";
      options.month = "long";
      options.year = "numeric";
    }

    if (format.includes("time")) {
      options.hour = "2-digit";
      options.minute = "2-digit";
      options.second = "2-digit";
    }
    const locale = store.getters.INFO.locale || "ru-RU";
    return new Intl.DateTimeFormat(locale, options).format(new Date(value));
  },
  currencyFilter(value, currency = "RUB") {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency,
    }).format(value);
  },
  localizeFilter(key) {
    const locales = {
      "en-US": en,
      "ru-RU": ru,
    };
    const locale = store.getters.INFO.locale || "ru-RU";
    return locales[locale][key] || `[Localize error] key is not found`;
  },
};
export default filters;
