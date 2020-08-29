import i18next from 'i18next'
import {
  initReactI18next,
  useTranslation,
  withTranslation,
} from 'react-i18next'
import * as RNLocalize from 'react-native-localize'

// settings
// https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
const resources = {
  ko: require('translations/ko.json'),
  en: require('translations/en.json'),
}
const supportedLanguages = Object.keys(resources)
const fallbackLanguage = 'ko'

// initialize with resources & options
i18next
  .use(initReactI18next)
  // https://www.i18next.com/overview/configuration-options
  .init({
    initImmediate: false,
    resources: resources,
    lng: fallbackLanguage,
    fallbackLng: fallbackLanguage,
    // not needed for react as it escapes by default
    interpolation: { escapeValue: false },
  })

export const setLanguage = (language?: string) => {
  const lang =
    language ||
    RNLocalize.findBestAvailableLanguage(supportedLanguages)?.languageTag ||
    fallbackLanguage
  i18next.changeLanguage(lang)
}

const onLocaleChange = () => setLanguage()
export const setupI18n = () => {
  setLanguage() // init with current language
  // detect system locale change
  RNLocalize.addEventListener('change', onLocaleChange)
}
export const teardownI18n = () => {
  RNLocalize.removeEventListener('change', onLocaleChange)
}

export type tFunc = (key: string, options?: any) => string

// make shorthand and fix output type
// for functional components
export const useT: () => {
  t: tFunc
} = useTranslation

// for class components
export const withT = withTranslation

// use it directly when not in a component
export const t: tFunc = i18next.t
