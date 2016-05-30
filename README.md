# es2015-i18n-tag
![](images/es2015-i18n-tag-icon-big.jpg)

[ES2015 template literal tag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals) for i18n and l10n translation and localization using [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)

## Features

* Translate and [internationalize](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) strings in your JavaScript project with [ES2015 standard](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals) tagged template literals
* Translate your JavaScript library at [buildtime](#build-time-translation)
* Generate a [schema](#json-schema) of all i18n tagged template literals in your project for easy JSON based translations

## Examples

https://github.com/skolmer/i18n-tag-examples  (TODO)

## Installation
```sh
$ npm install es2015-i18n-tag --save
```

## Usage

### Import and Configuration
```js   
import i18n, { i18nConfig }  from 'es2015-i18n-tag'

i18nConfig({
    locales: 'de-DE',    
    translations: {
        "Hello ${0}, you have ${1} in your bank account.": "Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto."
    },
    number: {      
        [...options]
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat#Parameters
    },
    date: {
        [...options]
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#Parameters
    }
})

const name = 'Steffen'
const amount = 1250.33
      
console.log(i18n`Hello ${ name }, you have ${ amount }:c in your bank account.`)
// Hallo Steffen, Sie haben US$ 1,250.33 auf Ihrem Bankkonto.
```

### Currency formatting
```js  
i18nConfig({
    number: { 
        currency: 'EUR'
    }
})

console.log(i18n`Hello ${ name }, you have ${ amount }:c in your bank account.`)
// Hallo Steffen, Sie haben € 1,250.33 auf Ihrem Bankkonto.
```

### Date formatting
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
#### Standard format strings

```js
const date = new Date(2012, 11, 20, 19, 0, 0);

i18n`The date is ${date}:t(D).`

// The date is Thursday, December 20, 2012.
```

The following standard format strings can be applied to a template expression of type [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)


| Format specifier | Description                             | Examples                                |
|------------------|-----------------------------------------|-----------------------------------------|
| "d"              | Short date pattern.                     | 12/20/2012                              |
| "D"              | Long date pattern.                      | Thursday, December 20, 2012             |
| "f"              | Full date/time pattern (short time).    | Thursday, December 20, 2012, 7:00 PM    |
| "F"              | Full date/time pattern (long time).     | Thursday, December 20, 2012, 7:00:00 PM |
| "g"              | General date/time pattern (short time). | 12/20/2012, 7:00 PM                     |
| "G"              | General date/time pattern (long time).  | 12/20/2012, 7:00:00 PM                  |
| "M", "m"         | Month/day pattern.                      | December 20                             |
| "t"              | Short time pattern.                     | 7:00 PM                                 |
| "T"              | Long time pattern.                      | 7:00:00 PM                              |
| "Y", "y"         | Year month pattern.                     | December 2012                           |

### Percentage formatting
```js       
console.log(i18n`Hello ${name}, the percentage is ${0.01}:p.`)
// Hello Steffen, the percentage is 1%.

i18nConfig({
    locales: 'de-DE'
})
console.log(i18n`Hello ${name}, the percentage is ${0.01}:p.`)
// Hello Steffen, the percentage is 1 %.
```

### Number formatting
```js   
console.log(i18n`Hello ${name}, the number is ${12345.678}:n(2).`)
// Hello Steffen, the number is 12,345.67.

i18nConfig({
    locales: 'de-DE'
})
console.log(i18n`Hello ${name}, the number is ${12345.678}:n(2).`)
// Hello Steffen, the number is 12.345,67.
```

### Nested templates
```js
let hello = [
    { name: "Steffen", percentage: 0.2 },
    { name: "Jack", percentage: 0.8 }
]
        
console.log(i18n`
    <users>
    ${hello.map((item) => i18n`
        <user name="${item.name}">${item.percentage}:p</user>
    `).join('')}
    </users>
`)
// <users>
// 
//     <user name="Steffen">20%</user>
// 
//     <user name="Jack">80%</user>
// 
// </users>
```
#### Note
For easy translation of multiline template literals use one of the following [json schema generators](#json-schema)

## Tools

### Build time translation
* [babel-plugin-i18n-tag-translate](https://github.com/skolmer/babel-plugin-i18n-tag-translate): Translate your template literals at build time.

### JSON Schema
* [i18n-tag-schema](https://github.com/skolmer/i18n-tag-schema): Generates a JSON schema based on all i18n tagged literals in your project.
* [vscode-18n-tag-schema](https://github.com/skolmer/vscode-i18n-tag-schema): Visual Studio Code Extension to generate a JSON schema.

## Credits

Thanks to [Jack Hsu](https://github.com/jaysoo) for his initial draft of an [i18n template literal](http://jaysoo.ca/2014/03/20/i18n-with-es6-template-strings/)
