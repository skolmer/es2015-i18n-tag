const typeInfoRegex = /^:([a-z])(\((.+)\))?/;

class tag {
    constructor() {
        this.locale = 'en-US'
        this.currency = 'USD'
        this.translations = {}
        this.number = {}
        this.date = {}
        this._localizers = {
            s /*string*/: v => v.toLocaleString(this.locale),
            c /*currency*/: (v, currency) => (
                v.toLocaleString(this.locale, {
                    style: 'currency',
                    currency: currency || this.currency
                })
            ),
            n /*number*/: (v, fractionalDigits) => (
                v.toLocaleString(this.locale, (fractionalDigits) ?
                    Object.assign({}, this.number, { minimumFractionDigits: fractionalDigits, maximumFractionDigits: fractionalDigits }) :
                    Object.assign({}, this.number)
                )
            ),
            t /*date*/: (v) => (
                v.toLocaleString(this.locale, (this.date) ?
                    Object.assign({}, this.date) :
                    {}
                )
            )
        }
        this.i18n = this.i18n.bind(this)
        this.i18nConfig = this.i18nConfig.bind(this)
        this._localize = this._localize.bind(this)
    }

    i18nConfig({locale, currency, translations, number, date}) {
        this.locale = locale || this.locale
        this.currency = currency || this.currency
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

export { i18n as default, i18nConfig }






