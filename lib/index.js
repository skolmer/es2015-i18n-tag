const typeInfoRegex = /^:([a-z])(\((.+)\))?/;

class tag {
    constructor() {
        this.locale = 'en-US'
        this.defaultCurrency = 'USD'
        this.messageBundle = {}
        this._localizers = {
            s /*string*/: v => v.toLocaleString(this.locale),
            c /*currency*/: (v, currency) => (
                v.toLocaleString(this.locale, {
                    style: 'currency',
                    currency: currency || this.defaultCurrency
                })
            ),
            n /*number*/: (v, fractionalDigits) => (
                v.toLocaleString(this.locale, {
                    minimumFractionDigits: fractionalDigits,
                    maximumFractionDigits: fractionalDigits
                })
            )
        }   
        this.i18n = this.i18n.bind(this)     
        this.i18nConfig = this.i18nConfig.bind(this)  
        this._localize = this._localize.bind(this)  
    }
    
    i18nConfig(locale, defaultCurrency, messageBundle) {
        this.locale = locale || this.locale
        this.defaultCurrency = defaultCurrency || this.defaultCurrency
        this.messageBundle = messageBundle || this.messageBundle
    }
    
    i18n(literals, ...values) {
        let translationKey = this._buildKey(literals);
        let translationString = this.messageBundle[translationKey] || translationKey;
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



 


 