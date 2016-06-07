const typeInfoRegex = /^:([a-z])(\((.+)\))?/;

class tag {
    constructor() {
        this.locales = undefined
        this.translations = {}
        this.number = { currency: 'USD' }
        this.date = {}
        this._localizers = {
            s /*string*/: v => v.toLocaleString(this.locales),
            c /*currency*/: (v, currency) => (
                v.toLocaleString(this.locales, (currency) ?
                    Object.assign({}, this.number, { style: 'currency', currency: currency }) :
                    Object.assign({}, this.number, { style: 'currency' })
                )
            ),
            p /*percent*/: (v) => (
                v.toLocaleString(this.locales, Object.assign({}, this.number, { style: 'percent' }))
            ),
            n /*number*/: (v, fractionalDigits) => (
                v.toLocaleString(this.locales, (fractionalDigits) ?
                    Object.assign({}, this.number, { style: 'decimal', minimumFractionDigits: fractionalDigits, maximumFractionDigits: fractionalDigits }) :
                    Object.assign({}, this.number, { style: 'decimal' })
                )
            ),
            t /*date*/: (v, format) => {
                if(format) {   
                    if(format.toUpperCase() === 'R') {
                        return v.toUTCString()
                    } else if(format.toUpperCase() === 'O') {
                        return v.toISOString()
                    }
                    return v.toLocaleString(this.locales, Object.assign({}, this.date, this._getStandardFormatSettings(format)))
                }
                return v.toLocaleString(this.locales, Object.assign({}, this.date))
            }
        }
        this.i18n = this.i18n.bind(this)
        this.i18nConfig = this.i18nConfig.bind(this)
        this._localize = this._localize.bind(this)
    }

    i18nConfig({locales, translations, number, date}) {
        this.locales = locales || this.locales
        this.translations = translations || this.translations
        this.number = number || this.number
        this.date = date || this.date
    }

    i18n(literals, ...values) {
        let translationKey = this._buildKey(literals);
        let translationString = this.translations[translationKey] || translationKey;
        let typeInfoForValues = literals.slice(1).map(this._extractTypeInfo);
        let localizedValues = values.map((v, i) => this._localize(v, typeInfoForValues[i]));
        return this._buildMessage(translationString, ...localizedValues);
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
                return {}
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
        return this._localizers[type](value, options);
    }

    // e.g. this._buildKey(['', ' has ', ':c in the']) == '{0} has {1} in the bank'
    _buildKey(literals) {
        let stripType = s => s.replace(typeInfoRegex, '');
        let lastPartialKey = stripType(literals[literals.length - 1]);
        let prependPartialKey = (memo, curr, i) => `${stripType(curr)}\${${i}}${memo}`;

        return literals.slice(0, -1).reduceRight(prependPartialKey, lastPartialKey);
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






