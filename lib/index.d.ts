// index.d.ts

type NumberConfig = {
    /**
     * The locale matching algorithm to use. The default is "best fit". 
     * For information about this option, see https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation
     */
    localeMatcher: "lookup" | "best fit",
    /**
     * The formatting style to use. 
     * Possible values are "decimal" for plain number formatting, "currency" for currency formatting, and "percent" for percent formatting; the default is "decimal".
     */
    style: "decimal" | "currency" | "percent",
    /**
     * The currency to use in currency formatting. Possible values are the ISO 4217 currency codes, such as "USD" for the US dollar, "EUR" for the euro, or "CNY" for the Chinese RMB
     * See the Current currency & funds code list. http://www.currency-iso.org/en/home/tables/table-a1.html
     * If the style is "currency", the currency property must be provided.
     */
    currency: string,
    /**
     * How to display the currency in currency formatting. 
     * Possible values are "symbol" to use a localized currency symbol such as €, "code" to use the ISO currency code, "name" to use a localized currency name such as "dollar"; the default is "symbol".
     */
    currencyDisplay: string,
    /**
     * Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators. The default is true.
     */
    useGrouping: boolean,
    /**
     * The minimum number of integer digits to use. Possible values are from 1 to 21; the default is 1.
     */
    minimumIntegerDigits: number,
    /**
     * The minimum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number and percent formatting is 0; the default for currency formatting is the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information).
     */
    minimumFractionDigits: number,
    /**
     * The maximum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number formatting is the larger of minimumFractionDigits and 3; the default for currency formatting is the larger of minimumFractionDigits and the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information); the default for percent formatting is the larger of minimumFractionDigits and 0.
     */
    maximumFractionDigits: number,
    /**
     * The minimum number of significant digits to use. Possible values are from 1 to 21; the default is 1.
     */
    minimumSignificantDigits: number,
    /**
     * The maximum number of significant digits to use. Possible values are from 1 to 21; the default is minimumSignificantDigits.
     */
    maximumSignificantDigits: number
}


type DateConfig = {
    /**
     * The locale matching algorithm to use. The default is "best fit". 
     * For information about this option, see https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation
     */
    localeMatcher: "lookup" | "best fit",
    /**
     * The time zone to use. The default is the runtime's default time zone.
     */
    timeZone: string,
    /**
     * Whether to use 12-hour time (as opposed to 24-hour time). The default is locale dependent.
     */
    hour12: boolean,
    /**
     * The format matching algorithm to use. The default is "best fit". 
     */
    formatMatcher: "basic" | "best fit",
    /**
     * The representation of the weekday. 
     */
    weekday: "narrow" | "short" | "long",
    /**
     * The representation of the era
     */
    era: "narrow" | "short" | "long",
    /**
     * The representation of the year. 
     */
    year: "numeric" | "2-digit",
    /**
     * The representation of the month. 
     */
    month: "numeric" | "2-digit" | "narrow" | "short" | "long",
    /**
     * The representation of the day. 
     */
    day: "numeric" | "2-digit",
    /**
     * The representation of the hour. 
     */
    hour: "numeric" | "2-digit",
    /**
     * The representation of the minute. 
     */
    minute: "numeric" | "2-digit",
    /**
     * The representation of the second. 
     */
    second: "numeric" | "2-digit",
    /**
     * The representation of the time zone name. 
     */
    timeZoneName: "short" | "long",
}

type Config = {
    /**
     * A string with a BCP 47 language tag, or an array of such strings. For the general form and interpretation of the locales argument, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation
     */
    locales?: string | Array<string>, 
    /**
     * An object that contains translations as key-value-pairs
     */
    translations?: { }, 
    /**
     * The name of the current configuration group. This option is recommended for libaries. 
     * To avoid configuration override, set a group that is unique to your library.
     */
    group?: string,
    /**
     * For more information about NumberFormat options, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     */
    number?: NumberConfig, 
    /**
     * For more information about DateTimeFormat options, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     */
    date?: DateConfig,
    /**
     * Can be used to define custom standard formatters for date, number and string suffix functions. `${ new Date() }:t([formatter])`
     */
    standardFormatters: {
        date: {
            [name : string] : (locales : string | Array<string>, dateOptions : DateConfig, value : Date) => string
        }
        number: {
            [name : string] : (locales : string | Array<string>, numberOptions : NumberConfig, value : number) => string
        }
        string: {
            [name : string] : (locales : string | Array<string>, stringOptions : {}, value : string) => string
        }
    }
}

/**
 * Handles i18n tagged template literals configuration
 * 
 * @param {Config} config Configuration object.
 */
export function i18nConfig(config: Config) : void

/**
 * i18n translation group class decorator
 * 
 * @param {group} the name of the translation group.
 * @param {group} the name of the configuration group. This option is recommended for libaries. To avoid configuration override, set a group that is unique to your library.
 * @param {target} the target class
 */
export function i18nGroup(group: string, config?: string): (target: any) => any 

/**
 * Transforms i18n tagged template literals
 * Use as template literal tag: i18n\`my ${index} translation\`
 * 
 * @param literals Template literals.
 * @param values Template values.
 */
export default function (group: string, config?: string) : (literals : Array<string>, ...values : Array<string>) => void