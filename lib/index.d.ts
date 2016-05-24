// index.d.ts

type NumberConfig = {
    localeMatcher: string,
    style: string,
    currency: string,
    currencyDisplay: string,
    useGrouping: boolean,
    minimumIntegerDigits: number,
    minimumFractionDigits: number,
    maximumFractionDigits: number,
    minimumSignificantDigits: number,
    maximumSignificantDigits: number
}

type DateConfig = {
    localeMatcher: string,
    timeZone: string,
    hour12: boolean,
    formatMatcher: string,
    weekday: string,
    era: string,
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    second: number,
    timeZoneName: string
}

type Config = {locale?: string, currency?: string, translations?: {}, number?: NumberConfig, date?: DateConfig}

/**
 * Handles i18n tagged template literals configuration
 * 
 * @param config Configuration object.
 */
export function i18nConfig(config: Config) : void

/**
 * Transforms i18n tagged template literals
 * 
 * @param config Configuration object.
 */
export default function i18n(literals, ...values) : void