// index.d.ts

// Type definitions for es2015-i18n-tag
// Project: i18n Tagged Template Literals
// Definitions by: Steffen Kolmer <https://github.com/skolmer/es2015-i18n-tag>

declare module 'es2015-i18n-tag' {   

    type NumberConfig = {
        /**
         * The locale matching algorithm to use. The default is "best fit". 
         * For information about this option, see https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation
         */
        localeMatcher?: "lookup" | "best fit",
        /**
         * The formatting style to use. 
         * Possible values are "decimal" for plain number formatting, "currency" for currency formatting, and "percent" for percent formatting; the default is "decimal".
         */
        style?: "decimal" | "currency" | "percent",
        /**
         * The currency to use in currency formatting. Possible values are the ISO 4217 currency codes, such as "USD" for the US dollar, "EUR" for the euro, or "CNY" for the Chinese RMB
         * See the Current currency & funds code list. http://www.currency-iso.org/en/home/tables/table-a1.html
         * If the style is "currency", the currency property must be provided.
         */
        currency?: string,
        /**
         * How to display the currency in currency formatting. 
         * Possible values are "symbol" to use a localized currency symbol such as €, "code" to use the ISO currency code, "name" to use a localized currency name such as "dollar"; the default is "symbol".
         */
        currencyDisplay?: "symbol" | "code" | "name",
        /**
         * Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators. The default is true.
         */
        useGrouping?: boolean,
        /**
         * The minimum number of integer digits to use. Possible values are from 1 to 21; the default is 1.
         */
        minimumIntegerDigits?: 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21,
        /**
         * The minimum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number and percent formatting is 0; the default for currency formatting is the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information).
         */
        minimumFractionDigits?: 0|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|20,
        /**
         * The maximum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number formatting is the larger of minimumFractionDigits and 3; the default for currency formatting is the larger of minimumFractionDigits and the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information); the default for percent formatting is the larger of minimumFractionDigits and 0.
         */
        maximumFractionDigits?: 0|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|20,
        /**
         * The minimum number of significant digits to use. Possible values are from 1 to 21; the default is 1.
         */
        minimumSignificantDigits?: 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21,
        /**
         * The maximum number of significant digits to use. Possible values are from 1 to 21; the default is minimumSignificantDigits.
         */
        maximumSignificantDigits?: 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21,
    };


    type DateConfig = {
        /**
         * The locale matching algorithm to use. The default is "best fit". 
         * For information about this option, see https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation
         */
        localeMatcher?: "lookup" | "best fit",
        /**
         * The time zone to use. The default is the runtime's default time zone.
         */
        timeZone?: string,
        /**
         * Whether to use 12-hour time (as opposed to 24-hour time). The default is locale dependent.
         */
        hour12?: boolean,
        /**
         * The format matching algorithm to use. The default is "best fit". 
         */
        formatMatcher?: "basic" | "best fit",
        /**
         * The representation of the weekday. 
         */
        weekday?: "narrow" | "short" | "long",
        /**
         * The representation of the era
         */
        era?: "narrow" | "short" | "long",
        /**
         * The representation of the year. 
         */
        year?: "numeric" | "2-digit",
        /**
         * The representation of the month. 
         */
        month?: "numeric" | "2-digit" | "narrow" | "short" | "long",
        /**
         * The representation of the day. 
         */
        day?: "numeric" | "2-digit",
        /**
         * The representation of the hour. 
         */
        hour?: "numeric" | "2-digit",
        /**
         * The representation of the minute. 
         */
        minute?: "numeric" | "2-digit",
        /**
         * The representation of the second. 
         */
        second?: "numeric" | "2-digit",
        /**
         * The representation of the time zone name. 
         */
        timeZoneName?: "short" | "long",
    };

    type Config = {
        /**
         * A string with a BCP 47 language tag, or an array of such strings. For the general form and interpretation of the locales argument, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation
         */
        locales?: string | Array<string>, 
        /**
         * An object that contains translations as key-value-pairs
         */
        translations?: {
            [key: string]: string | { [key: string]: string }
        }, 
        /**
         * The name of the current configuration group. This option is recommended for libraries. 
         * To avoid configuration override, set a group that is unique to your library.
         */
        group?: string,
        /**
         * For more information about NumberFormat options, see https://goo.gl/pDwbG2
         */
        number?: NumberConfig, 
        /**
         * For more information about DateTimeFormat options, see https://goo.gl/lslekB
         */
        date?: DateConfig,
        /**
         * Can be used to define custom standard formatters for date, number and string suffix functions. `${ new Date() }:t([formatter])`
         */
        standardFormatters?: {
            date?: {
                [name : string] : (locales : string | Array<string>, dateOptions : DateConfig, value : Date) => string
            }
            number?: {
                [name : string] : (locales : string | Array<string>, numberOptions : NumberConfig, value : number) => string
            }
            string?: {
                [name : string] : (locales : string | Array<string>, stringOptions : { [key: string]: any }, value : string) => string
            }
        }
    };

    interface i18nTemplateTag {
        /**
         * Transforms i18n tagged template literals.
         * 
         * @param literals Template literals.
         * @param values Template values.
         * 
         * @example 
         * 
         *     // common syntax: 
         *     i18n`The date is ${date}:t(D).`;
         * @example 
         * 
         *     // with group settings: 
         *     i18n('test-group', 'test-config')`Time: ${new Date()}:t(T)`;
         * 
         * @example 
         * 
         *     // with i18nGroup decorator: 
         *     this.i18n`Time: ${new Date()}:t(T)`;
         */
        (literals: TemplateStringsArray, ...values: Array<any>) : any;  

        /**
         * Translates i18n translation key.
         * 
         * @param key the translation key.
         * @param values the translation parameters.
         * 
         * @example 
         * 
         *     // common syntax: 
         *     i18n.translate('number: ${0}; text: ${1}', 24, 'test');
         *     i18n.translate('The date is ${0}', { value: new Date(), formatter: 't', format: 'D' });
         * 
         * @example 
         * 
         *     // with group settings: 
         *     i18n('test-group', 'test-config').translate('Time: ${0}', { value: new Date(), formatter: 't', format: 'D' });
         * 
         * @example 
         * 
         *     // with i18nGroup decorator: 
         *     this.i18n.translate('Time: ${0}', { value: new Date(), formatter: 't', format: 'D' });
         */
        translate(key: string, ...values: Array<any>): any;
    }       

    interface i18nTag extends i18nTemplateTag {
        /**
         * Returns the i18n template tag for a translation or config group.
         * 
         * @param group the name of the translation group.
         * @param config the name of the configuration group. This option is recommended for libraries. To avoid configuration override, set a group that is unique to your library.
         * 
         * @example 
         * 
         *     // with custom translation group: 
         *     i18n('components/Clock.js')`Time`;
         * 
         * @example 
         * 
         *     // with file module group and configuration group: 
         *     i18n(__translationGroup, 'my-lib')`Welcome`;
         */
        (group: string, config?: string): i18nTemplateTag;    
    }    

    /**
     * i18n Template Literal Tag
     */
    const i18n: i18nTag;  

    export default i18n;


    /**
     * Sets i18n tagged template literals configuration.
     * 
     * @param config Configuration object.
     * 
     * @example 
     * 
     *     // sample configuration:
     *     i18nConfig({
     *         locales: 'de-DE',    
     *         group: 'my-lib', // Optional, can be used to avoid configuration overrides. This is recommended for libraries!
     *         translations: {
     *             "Hello ${0}, you have ${1} in your bank account.": "Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto."
     *         },
     *         number: {      
     *             [...options] // Intl NumberFormat options as described here: https://goo.gl/pDwbG2
     *         },
     *         date: {
     *             [...options] // Intl DateTimeFormat options as described here: https://goo.gl/lslekB
     *         }
     *     })
     */
    export function i18nConfig(config: Config) : void;

    /**
     * i18n translation and configuration group class decorator.
     * 
     * @param group the name of the translation group.
     * @param config the name of the configuration group. This option is recommended for libraries. To avoid configuration override, set a group that is unique to your library.
     * 
     * @example 
     * 
     *     // default syntax: 
     *     class Clock {
     *         tick() {
     *             return this.i18n`Time: ${new Date()}:t(T)`
     *         }
     *     }
     *     export default i18nGroup(__translationGroup, 'my-lib')(Clock)
     * 
     * @example 
     * 
     *     // experimental class decorator syntax:    
     *     @i18nGroup(__translationGroup, 'my-lib')
     *     class Clock {
     *         tick() {
     *             return this.i18n`Time: ${new Date()}:t(T)`
     *         }
     *     }
     *     export default Clock
     */
    export function i18nGroup(group: string, config?: string): <TFunction extends Function>(target: TFunction) => TFunction & Group;

    type GroupClass = {
        /**
         * i18n Template Literal Tag
         */
        i18n: i18nTemplateTag
    }

    interface Group {
        new (...args): GroupClass;
        prototype: GroupClass;
    }
}
