# i18n Tagged Template Literals [![Build Status](https://img.shields.io/travis/skolmer/es2015-i18n-tag/master.svg?style=flat)](https://travis-ci.org/skolmer/es2015-i18n-tag) [![npm version](https://img.shields.io/npm/v/es2015-i18n-tag.svg?style=flat)](https://www.npmjs.com/package/es2015-i18n-tag)
[![NPM](https://nodei.co/npm/es2015-i18n-tag.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/es2015-i18n-tag/)

[![i18n Tagged Template Literals](images/es2015-i18n-tag-icon-big.jpg)](http://i18n-tag.kolmer.net/)

## Overview

This template literal tag adds support for i18n and l10n translation and localization to your JavaScript project.
It provides the following benefits:

* Very small footprint ![Common JS Module](https://badges.herokuapp.com/size/npm/es2015-i18n-tag/dist/lib/index.js?label=common%20js%20module) ![Minified + gzip](https://badges.herokuapp.com/size/npm/es2015-i18n-tag/dist/lib/index.umd.min.js?label=minified%20%2B%20gzip&gzip=true)
* Powerful [ES2015 standard template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals) syntax
* Internationalization based on [ECMA-402](http://www.ecma-international.org/ecma-402/2.0/) standard [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) browser API

## Features

* Translate and internationalize your JavaScript project
* Translate your JavaScript library at [buildtime](#build-time-translation)
* Generate a [schema](#json-schema) of all i18n tagged template literals in your project for easy JSON based translations

## Compatibility

This library is using the ECMAScript Internationalization API. All modern browsers, [except safari](https://www.safari-is-the-new-ie.com), have implemented this API. Safari support can be added with Andy Earnshaw's excellent Intl.js polyfill.
* [Intl Browser Support](http://caniuse.com/#search=Intl)
* [Intl Polyfill](https://github.com/andyearnshaw/Intl.js)

## Examples

* [JS Bin Playground](https://jsbin.com/rojilu/edit?js,output)
* [React/webpack](https://github.com/skolmer/i18n-tag-examples/tree/master/ReactJS)
* [jQuery/gulp](https://github.com/skolmer/i18n-tag-examples/tree/master/Simple)

## Installation
```sh
$ npm install es2015-i18n-tag --save
```

## Usage

This library is avaliable as CommonJS module and as UMD module that is consumable in CommonJS, AMD and with script tags. 
The UMD module is primarily for [online JS playgrounds](https://jsbin.com/rojilu/edit?html,js,output). It is highly recommended to use es2015-i18n-tag as CommonJS module with babel and [webpack](https://github.com/skolmer/i18n-tag-examples/tree/master/ReactJS) or [browserify](https://github.com/skolmer/i18n-tag-examples/tree/master/Simple) or in a [Node app with Intl Polyfill](https://github.com/andyearnshaw/Intl.js#intljs-and-node).

### UMD module on npmcdn.com

`https://npmcdn.com/es2015-i18n-tag/dist/lib/index.umd.min.js`

### Import and Configuration
```js   
import i18n, { i18nConfig }  from 'es2015-i18n-tag'

i18nConfig({
    locales: 'de-DE',    
    translations: {
        "Hello ${0}, you have ${1} in your bank account.": "Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto."
    },
    number: {      
        [...options] // Intl NumberFormat options as described here: https://goo.gl/pDwbG2
    },
    date: {
        [...options] // Intl DateTimeFormat options as described here: https://goo.gl/lslekB
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

console.log(i18n`Hello ${ name }, you have ${ amount }:c(USD) in your bank account.`)
// Hallo Steffen, Sie haben US$ 1,250.33 auf Ihrem Bankkonto.
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

The following standard format strings can be applied to a template expression of type [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date):


| Format specifier | Description                             | Examples                                |
|------------------|-----------------------------------------|-----------------------------------------|
| "d"              | Short date pattern                      | 12/20/2012                              |
| "D"              | Long date pattern                       | Thursday, December 20, 2012             |
| "f"              | Full date/time pattern (short time)     | Thursday, December 20, 2012, 7:00 PM    |
| "F"              | Full date/time pattern (long time)      | Thursday, December 20, 2012, 7:00:00 PM |
| "g"              | General date/time pattern (short time)  | 12/20/2012, 7:00 PM                     |
| "G"              | General date/time pattern (long time)   | 12/20/2012, 7:00:00 PM                  |
| "M", "m"         | Month/day pattern                       | December 20                             |
| "O", "o"         | ISO 8601 pattern                        | 2012-12-20T18:00:00.000Z                |
| "R", "r"         | RFC 1123 pattern                        | Thu, 20 Dec 2012 18:00:00 GMT           |
| "t"              | Short time pattern                      | 7:00 PM                                 |
| "T"              | Long time pattern                       | 7:00:00 PM                              |
| "Y", "y"         | Year month pattern                      | December 2012                           |

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

### Pluralization

You can use [nested templates](#nested-templates) for pluralization as shown in this [example](https://jsbin.com/zubugedeja/edit?js,output).

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
> **NOTE:** For easy translation of multiline template literals use one of the following [json schema generators](#json-schema)

### Standard format strings

You can add custom standard formatters similar to the predefined DateTime formatters. Valid types are `date`, `number` and `string`.
```js
i18nConfig({
    standardFormatters: {
        number: {
            x: (locales, numberOptions, value) => value.toLocaleString(locales, Object.assign({}, numberOptions, { style: 'percent' }))
        }
    }
})

console.log(i18n`${0.77}:n(x)`)
// 77%
```
### Translation Groups

Translation groups can be very useful to group translations by context. It can also be useful to avoid key duplicates in larger projects.
You can use [babel-plugin-i18n-tag-translate](https://github.com/skolmer/babel-plugin-i18n-tag-translate) to inject the relative path of your module as group name. Babel will inject `const __translationGroup = 'relative/path/to/module.ext'` into each module.

#### Babel generated file module groups

[Example](https://github.com/skolmer/i18n-tag-examples/tree/master/ReactJS)

##### .babelrc
```json
{
  "plugins": [
    ["i18n-tag-translate", {
      "groupDir": "./src"
    }]
  ]
}
```
##### Project Structure
```
.
├── src
|   └── components
|       ├── App.js
|       └── Clock.js
├── .babelrc
```
##### translations.de.json
```json
{
    "components/App.js": {
        "Welcome": "Willkommen"
    },
    "components/Clock.js": {
        "Time": "Zeit"
    }
}
```
##### App.js
```js
i18n(__translationGroup)`Welcome` // Select translation from module group e.g. "components/App.js"
i18n('components/Clock.js')`Time` // Select translation from a custom group
```
###### translation group class decorator
```js
import { i18nGroup } from 'es2015-i18n-tag'

/* default syntax */
class Clock {
    tick() {
        return this.i18n`Time: ${new Date()}:t(T)`
    }
}
export default i18nGroup(__translationGroup)(Clock)


/* experimental class decorator syntax */
@i18nGroup(__translationGroup)
class Clock {
    tick() {
        return this.i18n`Time: ${new Date()}:t(T)`
    }
}
export default Clock
```

## Tools

### Build time translation
* [babel-plugin-i18n-tag-translate](https://github.com/skolmer/babel-plugin-i18n-tag-translate): Translate your template literals at build time. [![npm version](https://img.shields.io/npm/v/babel-plugin-i18n-tag-translate.svg?style=flat)](https://www.npmjs.com/package/babel-plugin-i18n-tag-translate)

### JSON Schema
* [i18n-tag-schema](https://github.com/skolmer/i18n-tag-schema): Generates a JSON schema based on all i18n tagged literals in your project. [![npm version](https://img.shields.io/npm/v/i18n-tag-schema.svg?style=flat)](https://www.npmjs.com/package/i18n-tag-schema)
* [vscode-18n-tag-schema](https://github.com/skolmer/vscode-i18n-tag-schema): Visual Studio Code Extension to generate a JSON schema. [![Marketplace Version](https://vsmarketplacebadge.apphb.com/version-short/skolmer.vscode-i18n-tag-schema.svg)](https://marketplace.visualstudio.com/items?itemName=skolmer.vscode-i18n-tag-schema)

## Credits

Thanks to [Jack Hsu](https://github.com/jaysoo) for his initial draft of an [i18n template literal](http://jaysoo.ca/2014/03/20/i18n-with-es6-template-strings/).

## License

Copyright (c) 2016 Steffen Kolmer

This software is licensed under the MIT license.  See the `LICENSE` file
accompanying this software for terms of use.
