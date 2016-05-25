# es2015-i18n-tag
![](images/es2015-i18n-tag-icon-big.jpg)

ES2015 template literal tag for i18n and l10n translation and localization

## Installation
```sh
$ npm install es2015-i18n-tag --save
```

## Usage

### currency
```js
import i18n, { i18nConfig }  from 'es2015-i18n-tag'

const name = 'Steffen'
const amount = 1250.33

// config i18n literals
i18nConfig({
    locales: 'de-DE',    
    translations: {
        "Hello ${0}, you have ${1} in your bank account.": "Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto."
    },
    number: {
        currency: 'EUR'
    // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
    },
    date: {
    // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
    }
})
        
console.log(i18n`Hello ${ name }, you have ${ amount }:c in your bank account.`)
// Hallo Steffen, Sie haben € 1,250.33 auf Ihrem Bankkonto.
```

### date
```js
i18nConfig({
    locales: 'en-US',
    date: { 
        hour12: false 
    }
})

console.log(i18n`Hello ${name}, the date is ${new Date(2012, 11, 20, 19, 0, 0)}:t.`)
// Hello Steffen, the date is 12/20/2012, 19:00:00.
```

### percentage
```js       
console.log(i18n`Hello ${name}, the percentage is ${0.01}:p.`)
// Hello Steffen, the percentage is 1%.

i18nConfig({
    locales: 'de-DE'
})
console.log(i18n`Hello ${name}, the percentage is ${0.01}:p.`)
// Hello Steffen, the percentage is 1 %.
```

### number
```js   
console.log(i18n`Hello ${name}, the number is ${12345.678}:n(2).`)
// Hello Steffen, the number is 12,345.67.

i18nConfig({
    locales: 'de-DE'
})
console.log(i18n`Hello ${name}, the number is ${12345.678}:n(2).`)
// Hello Steffen, the number is 12.345,67.
```

## Tools

* [babel-plugin-i18n-tag-translate](https://github.com/skolmer/babel-plugin-i18n-tag-translate): Translate your template literals at build time.
* [i18n-tag-schema](https://github.com/skolmer/i18n-tag-schema): Generates a JSON schema based on all i18n tagged literals in your project.
* [vscode-18n-tag-schema](https://github.com/skolmer/vscode-i18n-tag-schema): Visual Studio Code Extension to generate a JSON schema.

## Credits

Thanks to [Jack Hsu](https://github.com/jaysoo) for his initial draft of an [i18n template literal](http://jaysoo.ca/2014/03/20/i18n-with-es6-template-strings/)
