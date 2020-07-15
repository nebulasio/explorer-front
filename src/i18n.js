import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "@/locales/en.json";
import { i18nConfig } from "@/config";
import Cookies from "js-cookie";

Vue.use(VueI18n);

function loadLocaleMessages() {
  const locales = require.context(
    "./locales",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

export function getUserLocale() {
  const locale =
    Cookies.get("locale") ||
    window.navigator.language ||
    window.navigator.userLanguage;
  console.log(
    locale,
    Cookies.get("locale"),
    window.navigator.language,
    window.navigator.userLanguage
  );
  return {
    locale: locale,
    localeNoISO: locale.split("-")[0]
  };
}

export const i18n = new VueI18n({
  locale: getUserLocale().locale || i18nConfig.locale || "en",
  fallbackLocale: i18nConfig.fallback_locale || "en",
  messages: loadLocaleMessages(),
  // 默认情况下回退到 fallbackLocale 会产生两个控制台警告：
  // [vue-i18n] Value of key 'message' is not a string!
  // [vue-i18n] Fall back to translate the keypath 'message' with 'en' locale.
  // set silentTranslationWarn=true, 隐藏警告
  silentTranslationWarn: true
});
