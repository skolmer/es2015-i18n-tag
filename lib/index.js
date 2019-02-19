const typeInfoRegex = /^:([a-z])(\(([^)]+)\))?/
const formatOptionNumeric = 'numeric'
const formatOptionLong = 'long'
const formatOption2Digit = '2-digit'
const typeString = 'string'
const typeNumber = 'number'
const typeDate = 'date'
const numberStyleDecimal = 'decimal'
const numberStyleCurrency = 'currency'
const numberStylePercent = 'percent'

const configD = {
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

const configD_cap = {
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

const configF = {
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

const configF_cap = {
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

const configG = {
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

const configG_cap = {
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

const configM = {
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

const configT = {
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

const configT_cap = {
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

const configY = {
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

const standardFormatSettings = {
    'd': configD,
    'D': configD_cap,
    'f': configF,
    'F': configF_cap,
    'g': configG,
    'G': configG_cap,
    'm': configM,
    'M': configM,
    't': configT,
    'T': configT_cap,
    'y': configY,
    'Y': configY
}

class Tag {

    constructor() {
        this.defaultConfig = {
            locales: undefined,
            translations: {},
            number: {
                currency: 'USD'
            },
            date: {},
            string: {}
        }

        this.configs = {
            '': this.defaultConfig
        }

        this.translationCache = {}

        this.keyCache = {}

        this.typeInfoCache = {}

        this._localizers = {
            s /*string*/: (config, v, format) => {
                let formatted
                if(format && (formatted = this._runCustomFormatters(config, typeString, format, v)) !== null) {
                    return formatted
                }
                return v.toLocaleString(config.locales)
            },
            n /*number*/: (config, v, format) => {
                if((typeof v) !== 'number') {
                    throw Error(`value is not a number. type: ${typeof v}`)
                }
                if(format) {
                    const fractionalDigits = parseInt(format)
                    if(!isNaN(fractionalDigits)) {
                        return v.toLocaleString(config.locales, Object.assign({}, config.number, { style: numberStyleDecimal, minimumFractionDigits: fractionalDigits, maximumFractionDigits: fractionalDigits }))
                    }
                    let formatted
                    if((formatted = this._runCustomFormatters(config, typeNumber, format, v)) !== null) {
                        return formatted
                    }
                }
                return v.toLocaleString(config.locales, Object.assign({}, config.number, { style: numberStyleDecimal, minimumFractionDigits: 0, maximumFractionDigits: 3 }))
            },
            t /*date*/: (config, v, format) => {
                if(!(v instanceof Date)) {
                    throw Error(`value is not a Date. type: ${v.constructor.name}`)
                }
                if (format) {
                    switch (format.toUpperCase()) {
                        case 'R':
                            return v.toUTCString()
                        case 'O':
                            return v.toISOString()
                    }
                    const formatOptions = standardFormatSettings[format]
                    if(formatOptions) {
                        return v.toLocaleString(config.locales, Object.assign({}, config.date, formatOptions))
                    } else {
                        const formatted = this._runCustomFormatters(config, typeDate, format, v)
                        if(formatted !== null) return formatted
                    }
                }
                return v.toLocaleString(config.locales, Object.assign({}, config.date))
            },
            c /*currency*/: (config, v, currency) => {
                if((typeof v) !== 'number') {
                    throw Error(`value is not a number. type: ${typeof v}`)
                }
                return v.toLocaleString(config.locales, (currency) ?
                    Object.assign({}, config.number, { style: numberStyleCurrency, currency }) :
                    Object.assign({}, config.number, { style: numberStyleCurrency })
                )
            },
            p /*percent*/: (config, v) => {
                if((typeof v) !== 'number') {
                    throw Error(`value is not a number. type: ${typeof v}`)
                }
                return v.toLocaleString(config.locales, Object.assign({}, config.number, { style: numberStylePercent }))
            }
        }
        this.i18n = this.i18n.bind(this)
        this.translate = this.translate.bind(this)
        this.i18nConfig = this.i18nConfig.bind(this)
        this._localize = this._localize.bind(this)
        this._extractTypeInfo = this._extractTypeInfo.bind(this)
    }

    i18nConfig({locales, translations, group, number, date, standardFormatters}) {
        // clear translation cache
        this.translationCache = {}
        const currentConfig = this.configs[group || ''] || this.defaultConfig
        this.configs[group || ''] = Object.assign({}, currentConfig, {
            locales: locales || currentConfig.locales,
            translations: translations || currentConfig.translations,
            number: number || currentConfig.number,
            date: date || currentConfig.date,
            standardFormatters: standardFormatters || currentConfig.standardFormatters
        })
    }

    i18n(group, config, literals, ...values) {
        const translationKey = this._buildKey(literals)     
        const { configGroup, translatedKey } = this._getCachedTranslation(group, config, translationKey)   
        const typeInfoForValues = literals.slice(1).map(this._extractTypeInfo)
        const localizedValues = values.map((v, i) => this._localize(configGroup, v, typeInfoForValues[i]))
        return this._buildMessage(translatedKey, ...localizedValues)
    }

    translate(group, config, key, ...values) {
        if(typeof key === 'undefined' || key === null) {
            key = ''
        } else if(typeof key !== 'string') {
            key = String(key)
        }

        const { configGroup, translatedKey } = this._getCachedTranslation(group, config, key)
        const localizedValues = values.map((v) => {
            if(v instanceof Object && v.constructor === Object) {
                return this._localize(configGroup, v.value || '', { type: v.formatter || 's', options: v.format })
            } 
            return this._localize(configGroup, v, { type: 's', options: '' })
        })
        return this._buildMessage(translatedKey, ...localizedValues)
    }

    _getCachedTranslation(group, config, translationKey) {
        const cacheKey = [group || '', config || '', translationKey].join()
        const cachedTranslation = this.translationCache[cacheKey]
        const configGroup = this.configs[config || ''] || this.defaultConfig
        if(cachedTranslation) {
            return { configGroup, translatedKey: cachedTranslation }
        }
        const translationString = this._getTranslation(group, configGroup, translationKey)  
        this.translationCache[cacheKey] = translationString
        return { configGroup, translatedKey: translationString }
    }

    _getTranslation(group, configGroup, translationKey) {
        const translations = configGroup['translations']
        let translationString
        let translationGroup
        if(typeof group === typeString) {
            translationGroup = group
        }
        if(translationGroup) {
            translationString = translations[translationGroup]
            if(translationString instanceof Object) {
                translationString = translationString[translationKey]
            }
        }
        if(!translationString) {
            translationString = (typeof translations[translationKey] === 'string' && translations[translationKey]) || translationKey
        }
        return translationString
    }

    _runCustomFormatters(config, type, format, value) {
        let formatted = null
        if(config.standardFormatters) {
            const formatters = config.standardFormatters[type]
            if(formatters) {
                const formatter = formatters[format]
                if(formatter) {
                    formatted = formatter(config.locales, config[type], value)
                }
            }
        }
        return formatted
    }

    _extractTypeInfo(literal) {
        let typeInfo = this.typeInfoCache[literal]
        if(typeInfo) {
            return typeInfo
        }
        const match = typeInfoRegex.exec(literal)
        if (match) {
            typeInfo = { type: match[1], options: match[3] }
        } else {
            typeInfo = { type: 's', options: '' }
        }
        this.typeInfoCache[literal] = typeInfo
        return typeInfo
    }

    _localize(config, value, {type, options}) {
        const localizer = this._localizers[type]
        if(localizer) {
            return localizer(config, value, options)
        }
        throw new Error(`Type '${type}' is not supported. Supported types are: ${Object.keys(this._localizers).join()}`)
    }

    // e.g. this._buildKey(['', ' has ', ':c in the']) == '{0} has {1} in the bank'
    _buildKey(literals) {
        const cacheKey = literals.join()
        const cachedKey = this.keyCache[cacheKey]
        if(cachedKey) {
            return cachedKey
        }

        const stripType = (s) => s.replace(typeInfoRegex, '')
        const lastPartialKey = stripType(literals[literals.length - 1])
        const prependPartialKey = (memo, curr, i) => `${stripType(curr)}\${${i}}${memo}`

        const key = literals.slice(0, -1).reduceRight(prependPartialKey, lastPartialKey).replace(/\r\n/g, '\n')
        this.keyCache[cacheKey] = key
        return key
    }

    // e.g. this._formatStrings('{0} {1}!', 'hello', 'world') == 'hello world!'
    _buildMessage(str, ...values) {
        return str.replace(/\${(\d)}/g, (_, index) => values[Number(index)])
    }
}

const i18ntag = new Tag()
const { i18nConfig } = i18ntag

const i18n = (literals, ...values) => {
    if (typeof literals === 'string') {
        if(values.length && typeof values[0] === 'string') {
            const delegate = (lit, ...val) => i18ntag.i18n(literals, values[0], lit, ...val)
            delegate.translate = (key, ...val) => i18ntag.translate(literals, values[0], key, ...val)
            return delegate
        } else {
            const delegate = (lit, ...val) => i18ntag.i18n(literals, null, lit, ...val)
            delegate.translate = (key, ...val) => i18ntag.translate(literals, null, key, ...val)
            return delegate
        }
    } else {
        return i18ntag.i18n(null, null, literals, ...values)
    }
}

i18n.translate = (key, ...values) => i18ntag.translate(null, null, key, ...values)

const i18nGroup = (group, config) => (target) => {
    target.prototype.i18n = (literals, ...values) => i18n(group, config)(literals, ...values)
    target.prototype.i18n.translate = (key, ...values) => i18ntag.translate(group, config, key, ...values)
    return target
}

if (typeof window !== 'undefined') {
    window.i18n = i18n
    window.i18nConfig = i18nConfig
    window.i18nGroup = i18nGroup
}

export { i18n as default, i18nConfig, i18nGroup }






