const typeInfoRegex = /^:([a-z])(\((.+)\))?/;

class tag {
    constructor() {
        this.locales = undefined
        this.translations = {}
        this.number = { currency: 'USD' }
        this.date = {}
        this.standardFormatters = {}
        this.string = {}
        this._localizers = {
            s /*string*/: (v, format) => {
                let formatted;
                if(format && (formatted = this._runCustomFormatters('string', format, v)) !== null) {
                    return formatted;
                }
                return v.toLocaleString(this.locales)
            },            
            n /*number*/: (v, format) => {
                if(format) {
                    let fractionalDigits = parseInt(format)                    
                    if(!isNaN(fractionalDigits)) {
                        return v.toLocaleString(this.locales, Object.assign({}, this.number, { style: 'decimal', minimumFractionDigits: fractionalDigits, maximumFractionDigits: fractionalDigits }))
                    }
                    let formatted
                    if((formatted = this._runCustomFormatters('number', format, v)) !== null) {                       
                        return formatted;
                    }
                }
                v.toLocaleString(this.locales, Object.assign({}, this.number, { style: 'decimal' }))
            },
            t /*date*/: (v, format) => {
                if (format) {
                    switch (format.toUpperCase()) {
                        case 'R':
                            return v.toUTCString()
                        case 'O':
                            return v.toISOString()                            
                    }
                    let formatOptions = this._getStandardFormatSettings(format)
                    if(formatOptions) {
                        return v.toLocaleString(this.locales, Object.assign({}, this.date, formatOptions))
                    } else {
                        let formatted = this._runCustomFormatters('date', format, v)
                        if(formatted !== null) return formatted
                    }
                }
                return v.toLocaleString(this.locales, Object.assign({}, this.date))
            },
            c /*currency*/: (v, currency) => (
                v.toLocaleString(this.locales, (currency) ?
                    Object.assign({}, this.number, { style: 'currency', currency: currency }) :
                    Object.assign({}, this.number, { style: 'currency' })
                )
            ),
            p /*percent*/: (v) => (
                v.toLocaleString(this.locales, Object.assign({}, this.number, { style: 'percent' }))
            )
        }
        this.i18n = this.i18n.bind(this)
        this.i18nConfig = this.i18nConfig.bind(this)
        this._localize = this._localize.bind(this)
    }

    i18nConfig({locales, translations, number, date, standardFormatters}) {
        this.locales = locales || this.locales
        this.translations = translations || this.translations
        this.number = number || this.number
        this.date = date || this.date
        this.standardFormatters = standardFormatters || this.standardFormatters
    }

    i18n(literals, ...values) {
        let translationKey = this._buildKey(literals)
        let translationString = this.translations[translationKey] || translationKey
        let typeInfoForValues = literals.slice(1).map(this._extractTypeInfo)
        let localizedValues = values.map((v, i) => this._localize(v, typeInfoForValues[i]))
        return this._buildMessage(translationString, ...localizedValues)
    }

    _runCustomFormatters(type, format, value) {
        let formatted = null;
        if(this.standardFormatters && this.standardFormatters[type]) {            
            Object.keys(this.standardFormatters[type]).forEach((val) => {
                if(val === format) {
                    const formatter = this.standardFormatters[type][val]
                    if(formatter) {
                        formatted = formatter(this.locales, this[type], value)
                    }
                }
            })
        }
        return formatted;
    }

    _getStandardFormatSettings(fromatString) {
        switch (fromatString) {
            case 'd':
                return {
                    weekday: undefined,
                    era: undefined,
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: undefined,
                    minute: undefined,
                    second: undefined,
                    timeZoneName: undefined
                }
            case 'D':
                return {
                    weekday: 'long',
                    era: undefined,
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: undefined,
                    minute: undefined,
                    second: undefined,
                    timeZoneName: undefined
                }
            case 'f':
                return {
                    weekday: 'long',
                    era: undefined,
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    second: undefined,
                    timeZoneName: undefined
                }
            case 'F':
                return {
                    weekday: 'long',
                    era: undefined,
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZoneName: undefined
                }
            case 'g':
                return {
                    weekday: undefined,
                    era: undefined,
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    second: undefined,
                    timeZoneName: undefined
                }
            case 'G':
                return {
                    weekday: undefined,
                    era: undefined,
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZoneName: undefined
                }
            case 'm':
            case 'M':
                return {
                    weekday: undefined,
                    era: undefined,
                    year: undefined,
                    month: 'long',
                    day: 'numeric',
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
                    hour: 'numeric',
                    minute: '2-digit',
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
                    hour: 'numeric',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZoneName: undefined
                }
            case 'y':
            case 'Y':
                return {
                    weekday: undefined,
                    era: undefined,
                    year: 'numeric',
                    month: 'long',
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
        let match = typeInfoRegex.exec(literal);
        if (match) {
            return { type: match[1], options: match[3] };
        } else {
            return { type: 's', options: '' };
        }
    }

    _localize(value, {type, options}) {
        let localizer = this._localizers[type]
        if(localizer) {
            return localizer(value, options)
        }
        throw new Error(`Type '${type}' is not supported. Supported types are: ${Object.keys(this._localizers).join()}`)
    }

    // e.g. this._buildKey(['', ' has ', ':c in the']) == '{0} has {1} in the bank'
    _buildKey(literals) {
        let stripType = s => s.replace(typeInfoRegex, '');
        let lastPartialKey = stripType(literals[literals.length - 1]);
        let prependPartialKey = (memo, curr, i) => `${stripType(curr)}\${${i}}${memo}`;

        return literals.slice(0, -1).reduceRight(prependPartialKey, lastPartialKey).replace(/\r\n/g, '\n');
    }

    // e.g. this._formatStrings('{0} {1}!', 'hello', 'world') == 'hello world!'
    _buildMessage(str, ...values) {
        return str.replace(/\${(\d)}/g, (_, index) => values[Number(index)]);
    }


}

var i18ntag = new tag()
var { i18n, i18nConfig } = i18ntag
if (typeof window !== 'undefined') {
    window.i18n = i18n
    window.i18nConfig = i18nConfig
}

export { i18n as default, i18nConfig }






