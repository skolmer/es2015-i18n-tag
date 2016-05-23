# es2015-i18n-tag
![](images/es2015-i18n-tag-icon-big.jpg)

ES2015 template literal tag for i18n and l10n translation and localization

## Installation
```sh
$ npm install es2015-i18n-tag --save-dev
```

## Usage
```js
import i18n, { i18nConfig }  from 'es2015-i18n-tag'

const name = 'Steffen'
const amount = 1250.33

// config i18n literals
i18nConfig('de-DE', 'EUR', {
    "Hello ${0}, you have ${1} in your bank account.": "Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto."
})
        
i18n`Hello ${ name }, you have ${ amount }:c in your bank account.`
// Hallo Steffen, Sie haben € 1,250.33 auf Ihrem Bankkonto.
```