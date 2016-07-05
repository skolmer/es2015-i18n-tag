const typeInfoRegex = /^:([a-z])(\((.+)\))?/
const formatOptionNumeric = 'numeric'
const formatOptionLong = 'long'
const formatOption2Digit = '2-digit'
const typeString = 'string'
const typeNumber = 'number'
const typeDate = 'date'
const numberStyleDecimal = 'decimal'
const numberStyleCurrency = 'currency'
const numberStylePercent = 'percent'

class Tag {
    constructor() {
        this.locales = undefined
        this.translations = {}
        this.number = { currency: 'USD' }
        this.date = {}
        this.standardFormatters = {}
        this.string = {}
        this.group
        this._localizers = {
            s /*string*/: (v, format) => {
                let formatted
                if(format && (formatted = this._runCustomFormatters(typeString, format, v)) !== null) {
                    return formatted
                }
                return v.toLocaleString(this.locales)
            },            
            n /*number*/: (v, format) => {
                if(format) {
                    const fractionalDigits = parseInt(format)                    
                    if(!isNaN(fractionalDigits)) {
                        return v.toLocaleString(this.locales, Object.assign({}, this.number, { style: numberStyleDecimal, minimumFractionDigits: fractionalDigits, maximumFractionDigits: fractionalDigits }))
                    }
                    let formatted
                    if((formatted = this._runCustomFormatters(typeNumber, format, v)) !== null) {                       
                        return formatted
                    }
                }
                v.toLocaleString(this.locales, Object.assign({}, this.number, { style: numberStyleDecimal }))
            },
            t /*date*/: (v, format) => {
                if (format) {
                    switch (format.toUpperCase()) {
                        case 'R':
                            return v.toUTCString()
                        case 'O':
                            return v.toISOString()                            
                    }
                    const formatOptions = this._getStandardFormatSettings(format)
                    if(formatOptions) {
                        return v.toLocaleString(this.locales, Object.assign({}, this.date, formatOptions))
                    } else {
                        const formatted = this._runCustomFormatters(typeDate, format, v)
                        if(formatted !== null) return formatted
                    }
                }
                return v.toLocaleString(this.locales, Object.assign({}, this.date))
            },
            c /*currency*/: (v, currency) => (
                v.toLocaleString(this.locales, (currency) ?
                    Object.assign({}, this.number, { style: numberStyleCurrency, currency }) :
                    Object.assign({}, this.number, { style: numberStyleCurrency })
                )
            ),
            p /*percent*/: (v) => (
                v.toLocaleString(this.locales, Object.assign({}, this.number, { style: numberStylePercent }))
            )
        }
        this.i18n = this.i18n.bind(this)
        this.i18nConfig = this.i18nConfig.bind(this)
        this._localize = this._localize.bind(this)
    }

    i18nConfig({locales, translations, group, number, date, standardFormatters}) {
        this.locales = locales || this.locales
        this.translations = translations || this.translations
        this.number = number || this.number
        this.date = date || this.date
        this.standardFormatters = standardFormatters || this.standardFormatters
        this.group = group || this.group
    }

    i18n(group, literals, ...values) {
        const translationKey = this._buildKey(literals)
        let translationString
        let translationGroup = this.group
        if(typeof group === typeString) {
            translationGroup = group
        }
        if(translationGroup) {
            translationString = this.translations[translationGroup]
            if(translationString instanceof Object) {
                translationString = translationString[translationKey]
            }
        }
        if(!translationString) translationString = this.translations[translationKey] || translationKey
        const typeInfoForValues = literals.slice(1).map(this._extractTypeInfo)
        const localizedValues = values.map((v, i) => this._localize(v, typeInfoForValues[i]))
        return this._buildMessage(translationString, ...localizedValues)
    }

    _runCustomFormatters(type, format, value) {
        let formatted = null
        if(this.standardFormatters) {
            const formatters = this.standardFormatters[type]
            if(formatters) {
                const formatter = formatters[format]
                if(formatter) {
                    formatted = formatter(this.locales, this[type], value)
                }
            }
        }
        return formatted
    }

    _getStandardFormatSettings(fromatString) {
        switch (fromatString) {
            case 'd':
                return {
                    weekday: undefined,
                    era: undefined,
                    year: formatOptionNumeric,
                    month: formatOptionNumeric,
                    day: formatOptionNumeric,
                    hour: undefined,
                    minute: undefined,
                    second: undefined,
                    timeZoneName: undefined
                }
            case 'D':
                return {
                    weekday: formatOptionLong,
                    era: undefined,
                    year: formatOptionNumeric,
                    month: formatOptionLong,
                    day: formatOptionNumeric,
                    hour: undefined,
                    minute: undefined,
                    second: undefined,
                    timeZoneName: undefined
                }
            case 'f':
                return {
                    weekday: formatOptionLong,
                    era: undefined,
                    year: formatOptionNumeric,
                    month: formatOptionLong,
                    day: formatOptionNumeric,
                    hour: formatOptionNumeric,
                    minute: formatOption2Digit,
                    second: undefined,
                    timeZoneName: undefined
                }
            case 'F':
                return {
                    weekday: formatOptionLong,
                    era: undefined,
                    year: formatOptionNumeric,
                    month: formatOptionLong,
                    day: formatOptionNumeric,
                    hour: formatOptionNumeric,
                    minute: formatOption2Digit,
                    second: formatOption2Digit,
                    timeZoneName: undefined
                }
            case 'g':
                return {
                    weekday: undefined,
                    era: undefined,
                    year: formatOptionNumeric,
                    month: formatOptionNumeric,
                    day: formatOptionNumeric,
                    hour: formatOptionNumeric,
                    minute: formatOption2Digit,
                    second: undefined,
                    timeZoneName: undefined
                }
            case 'G':
                return {
                    weekday: undefined,
                    era: undefined,
                    year: formatOptionNumeric,
                    month: formatOptionNumeric,
                    day: formatOptionNumeric,
                    hour: formatOptionNumeric,
                    minute: formatOption2Digit,
                    second: formatOption2Digit,
                    timeZoneName: undefined
                }
            case 'm':
            case 'M':
                return {
                    weekday: undefined,
                    era: undefined,
                    year: undefined,
                    month: formatOptionLong,
                    day: formatOptionNumeric,
                    hour: undefined,
                    minute: undefined,
                    second: undefined,
                    timeZoneName: undefined
                }
            case 't':
                return {
                    weekday: undefined,
                    era: undefined,
                    year: undefined,
                    month: undefined,
                    day: undefined,
                    hour: formatOptionNumeric,
                    minute: formatOption2Digit,
                    second: undefined,
                    timeZoneName: undefined
                }
            case 'T':
                return {
                    weekday: undefined,
                    era: undefined,
                    year: undefined,
                    month: undefined,
                    day: undefined,
                    hour: formatOptionNumeric,
                    minute: formatOption2Digit,
                    second: formatOption2Digit,
                    timeZoneName: undefined
                }
            case 'y':
            case 'Y':
                return {
                    weekday: undefined,
                    era: undefined,
                    year: formatOptionNumeric,
                    month: formatOptionLong,
                    day: undefined,
                    hour: undefined,
                    minute: undefined,
                    second: undefined,
                    timeZoneName: undefined
                }
            default:
                return null
        }
    }

    _extractTypeInfo(literal) {
        const match = typeInfoRegex.exec(literal)
        if (match) {
            return { type: match[1], options: match[3] }
        } else {
            return { type: 's', options: '' }
        }
    }

    _localize(value, {type, options}) {
        const localizer = this._localizers[type]
        if(localizer) {
            return localizer(value, options)
        }
        throw new Error(`Type '${type}' is not supported. Supported types are: ${Object.keys(this._localizers).join()}`)
    }

    // e.g. this._buildKey(['', ' has ', ':c in the']) == '{0} has {1} in the bank'
    _buildKey(literals) {
        const stripType = (s) => s.replace(typeInfoRegex, '')
        const lastPartialKey = stripType(literals[literals.length - 1])
        const prependPartialKey = (memo, curr, i) => `${stripType(curr)}\${${i}}${memo}`

        return literals.slice(0, -1).reduceRight(prependPartialKey, lastPartialKey).replace(/\r\n/g, '\n')
    }

    // e.g. this._formatStrings('{0} {1}!', 'hello', 'world') == 'hello world!'
    _buildMessage(str, ...values) {
        return str.replace(/\${(\d)}/g, (_, index) => values[Number(index)])
    }
}

const i18ntag = new Tag()
const { i18nConfig } = i18ntag

const i18n = (literals, ...values) => {
    if (typeof literals === typeString) {
        return (lit, ...val) => i18ntag.i18n(literals, lit, ...val)
    } else {
        return i18ntag.i18n(null, literals, ...values)
    }    
}

const i18nGroup = (group) => (Target) => (props) => { 
    Target = new Target(props)
    Target.i18n = (literals, ...values) => i18n(group)(literals, ...values)
    return Target
}

if (typeof window !== 'undefined') {
    window.i18n = i18n
    window.i18nConfig = i18nConfig
    window.i18nGroup = i18nGroup
}

export { i18n as default, i18nConfig, i18nGroup }






