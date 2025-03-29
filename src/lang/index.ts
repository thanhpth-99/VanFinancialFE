import { createI18n, type I18nOptions } from 'vue-i18n'
import viMessage from './vi.json'
import enMessage from './en.json'

const messages = {
    vi: viMessage,
    en: enMessage,
} as const

const options: I18nOptions = {
    locale: 'vi',
    fallbackLocale: 'vi',
    messages,
}

const i18n = createI18n(options)

export default i18n
