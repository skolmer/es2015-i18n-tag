# es2015-i18n-tag
![](images/es2015-i18n-tag-icon-big.jpg)

ES2015 template literal tag for i18n and l10n translation and localization

## Installation
```sh
$ npm install es2015-i18n-tag --save
```

## Usage
```js
import i18n, { i18nConfig }  from 'es2015-i18n-tag'

const name = 'Steffen'
const amount = 1250.33

// config i18n literals
i18nConfig({
    locale: 'de-DE',
    currency: 'EUR',
    translations: {
        "Hello ${0}, you have ${1} in your bank account.": "Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto."
    },
    number: {
    // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
    },
    date: {
    // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
    }
})
        
i18n`Hello ${ name }, you have ${ amount }:c in your bank account.`
// Hallo Steffen, Sie haben € 1,250.33 auf Ihrem Bankkonto.
```

## Tools

* [babel-plugin-i18n-tag-translate](https://github.com/skolmer/babel-plugin-i18n-tag-translate): Translate your template literals at build time.
* [i18n-tag-schema](https://github.com/skolmer/i18n-tag-schema): Generates a JSON schema based on all i18n tagged literals in your project.
* [vscode-18n-tag-schema](https://github.com/skolmer/vscode-i18n-tag-schema): Visual Studio Code Extension to generate a JSON schema.

## Credits

Thanks to [Jack Hsu](https://github.com/jaysoo) for his initial draft of an [i18n template literal](http://jaysoo.ca/2014/03/20/i18n-with-es6-template-strings/)
