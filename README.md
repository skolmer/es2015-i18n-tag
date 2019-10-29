# i18n Tagged Template Literals 
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors)
[![Build Status](https://img.shields.io/travis/skolmer/es2015-i18n-tag/master.svg?style=flat)](https://travis-ci.org/skolmer/es2015-i18n-tag) [![Coverage Status](https://coveralls.io/repos/github/skolmer/es2015-i18n-tag/badge.svg?branch=master)](https://coveralls.io/github/skolmer/es2015-i18n-tag?branch=master) [![npm version](https://img.shields.io/npm/v/es2015-i18n-tag.svg?style=flat)](https://www.npmjs.com/package/es2015-i18n-tag) [![npm](https://img.shields.io/npm/dw/es2015-i18n-tag.svg)](https://www.npmjs.com/package/es2015-i18n-tag/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![MIT License](https://img.shields.io/npm/l/ghooks.svg)](http://opensource.org/licenses/MIT)

[![NPM](https://nodei.co/npm/es2015-i18n-tag.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/es2015-i18n-tag/) 

[![i18n Tagged Template Literals](images/es2015-i18n-tag-icon-big.jpg)](http://i18n-tag.kolmer.net/)

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Compatibility](#compatibility)
* [Examples](#examples)
* [Installation](#installation)
* [Usage](#usage)
  * [UMD module on unpkg.com](#umd-module-on-unpkgcom) 
  * [Import and Configuration](#import-and-configuration)
  * [Currency formatting](#currency-formatting)
  * [Date formatting](#date-formatting)
    * [Standard format strings](#standard-format-strings)
  * [Percentage formatting](#percentage-formatting) 
  * [Number formatting](#number-formatting)
  * [Pluralization](#pluralization)
  * [Nested templates](#nested-templates)
  * [Standard format strings](#standard-format-strings)
  * [Translation Groups](#translation-groups)
    * [Babel generated file module groups](#babel-generated-file-module-groups)
      * [.babelrc](#babelrc) 
      * [Project Structure](#project-structure)
      * [translations.de.json](#translationsdejson)
      * [App.js](#appjs)
      * [i18nGroup Class Decorator](#i18ngroup-class-decorator)
  * [Configuration Groups](#configuration-groups)
    * [i18n Option](#i18n-option)
    * [i18nGroup Class Decorator](#i18ngroup-class-decorator)
  * [Translating without template literals](#translating-without-template-literals)
    * [Simple string translation](#simple-string-translation)
    * [Using formatters](#using-formatters)
    * [Using config and translation groups](#using-config-and-translation-groups)
* [Translations as CommonJS Modules](#translations-as-commonjs-modules)
  * [./my-lib/de/index.js](#my-libdeindexjs)
  * [./my-lib/index.js](#my-libindexjs)
  * [Import library with german translations into an app](#import-library-with-german-translations-into-an-app)
* [Tools](#tools)
  * [Build time translation](#build-time-translation)
  * [JSON Schema](#json-schema)
* [Credits](#credits)
* [License](#license)

## Overview

This template literal tag adds support for i18n and l10n (translation and internationalization) to your JavaScript project.
It provides the following benefits:

* Very small footprint ![Common JS Module](https://badges.herokuapp.com/size/npm/es2015-i18n-tag/dist/lib/index.js?label=common%20js%20module) ![Minified + gzip](https://badges.herokuapp.com/size/npm/es2015-i18n-tag/dist/lib/index.umd.min.js?label=minified%20%2B%20gzip&gzip=true)
* Powerful [ES2015 standard template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals) syntax
* Internationalization based on [ECMA-402](http://www.ecma-international.org/ecma-402/2.0/) standard [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) browser API
* [JSON Schema](http://json-schema.org/documentation.html) powered translations
* [Tools](#tools) that can be integrated into your build pipeline and [IDE](https://github.com/skolmer/i18n-tag-schema#ide-integration)

## Features

* Translate and internationalize your JavaScript project
* Translate your JavaScript library at [buildtime](#build-time-translation)
* Generate a [schema](#json-schema) of all i18n tagged template literals in your project for easy JSON based translations
* Export translations [as CommonJS modules](#translations-as-commonjs-modules)
* [Validate translations](https://github.com/skolmer/i18n-tag-schema#validate-translation-file) and track translation coverage of your project

## Compatibility

This library is using the ECMAScript Internationalization API. ES Internationalization API is implemented in all modern Browsers. For node.js projects you can use Andy Earnshaw's excellent Intl.js polyfill [[#34](https://github.com/skolmer/es2015-i18n-tag/issues/34#issuecomment-303114372)]:
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

This library is available as CommonJS module and as UMD module that is consumable in CommonJS, AMD and with script tags. 
The UMD module can be used in [environments that don't support CommonJS modules](https://jsbin.com/rojilu/edit?html,js,output). It is highly recommended to use es2015-i18n-tag as CommonJS module with babel and [webpack](https://github.com/skolmer/i18n-tag-examples/tree/master/ReactJS) or [browserify](https://github.com/skolmer/i18n-tag-examples/tree/master/Simple). In a Node.js environment you have to use the [Intl Polyfill](https://github.com/andyearnshaw/Intl.js#intljs-and-node) to add support for additional locales [[#34](https://github.com/skolmer/es2015-i18n-tag/issues/34#issuecomment-303114372)].

### UMD module on unpkg.com

`https://unpkg.com/es2015-i18n-tag/dist/lib/index.umd.min.js`

### Import and Configuration
```js   
import i18n, { i18nConfig }  from 'es2015-i18n-tag'

i18nConfig({
    locales: 'de-DE',    
    group: 'my-lib', // Optional, can be used to avoid configuration overrides. This is recommended for libraries!
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

console.log(i18n`Hello ${name}, the percentage is ${0.005}:p(1).`)
// Hello Steffen, the percentage is 0.5%.

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
> **NOTE:** For easy translation of multiline template literals use one of the following [json schema generators](#json-schema).

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
##### i18nGroup Class Decorator
```js
import { i18nGroup } from 'es2015-i18n-tag'

/* default syntax */
class Clock {
    tick() {
        return this.i18n`Time: ${new Date()}:t(T)` // you have to use the class instance of i18n to get the grouped translation
    }
}
export default i18nGroup(__translationGroup)(Clock)


/* experimental class decorator syntax */
@i18nGroup(__translationGroup)
class Clock {
    tick() {
        return this.i18n`Time: ${new Date()}:t(T)` // you have to use the class instance of i18n to get the grouped translation
    }
}
export default Clock
```

### Configuration Groups

Configuration groups should be used by libraries to avoid configuration overrides. Configuration groups are like namespaces and only applied if the group name is set via i18n tag or i18nGroup decorator.

##### i18n Option
```js
i18n(__translationGroup, 'my-lib')`Welcome` // Select translation from module group e.g. "components/App.js"
i18n('components/Clock.js', 'my-lib')`Time` // Select translation from a custom group
```
##### i18nGroup Class Decorator
```js
import { i18nGroup, i18nConfig } from 'es2015-i18n-tag'

i18nConfig({
    locales: 'de-DE',
    group: 'my-lib' // set translation and i18n config for 'my-lib'
    translations: {
        "components/App.js": {
            "Welcome": "Willkommen"
        },
        "components/Clock.js": {
            "Time": "Zeit"
        }
    }
})

/* default syntax */
class Clock {
    tick() {
        return this.i18n`Time: ${new Date()}:t(T)`
    }
}
export default i18nGroup(__translationGroup, 'my-lib')(Clock)


/* experimental class decorator syntax */
@i18nGroup(__translationGroup, 'my-lib')
class Clock {
    tick() {
        return this.i18n`Time: ${new Date()}:t(T)`
    }
}
export default Clock
```

### Translating without template literals

If you have to translate variables that cannot be put into a template literal, you can use the `i18n.translate()` helper function.

#### Simple string translation

```js
i18n.translate('Welcome')

var somVar = 'translationkey'
i18n.translate(somVar) 
```

#### Using formatters

```js
const name = 'Steffen'
const amount = 1250.33
      
i18n.translate('Hello ${0}, you have ${1} in your bank account.', name, { value: amount, formatter: 'c'})

i18n.translate('Total: ${0}', { value: amount, formatter: 'd', format: 2})
```

#### Using config and translation groups

```js
i18n(__translationGroup, 'my-lib').translate('Welcome') // Select translation from module group e.g. "components/App.js"
i18n('components/Clock.js', 'my-lib').translate('Time') // Select translation from a custom group

class Clock {
    tick() {
        return this.i18n.translate('Time: ${0}', { value: new Date(), formatter: 't', format: 'T' })
    }
}
export default i18nGroup(__translationGroup, 'my-lib')(Clock)
```


## Translations as CommonJS Modules

If you are working on a multilingual library it might be useful to export i18n settings and translations as CommonJS modules. This can be easily accomplished with webpack and [json-loader](https://github.com/webpack/json-loader) as shown in this example:

[Example](https://github.com/skolmer/i18n-tag-examples/tree/master/MultilingualLibrary)

### ./my-lib/de/index.js

```js
import translations from 'json!../../translations/translation.de.json'

i18nConfig({
    locales: 'de-DE',
    group: 'my-lib' // set translation and i18n config for 'my-lib'
    number: { 
        currency: 'EUR'
    },
    translations
}) // set internationalization settings and add imported translations

```

### ./my-lib/index.js
```js
@i18nGroup('', 'my-lib')
class Clock {
    tick() {
        return this.i18n`Time: ${new Date()}:t(T)`
    }
}
```

### Import library with german translations into an app

```js
import my-lib from 'my-lib'
import 'my-lib/de' // import german i18n configuration and translation
```

## Tools

### Build time translation
* [babel-plugin-i18n-tag-translate](https://github.com/skolmer/babel-plugin-i18n-tag-translate): Translate your template literals at build time or add filename groups [![npm version](https://img.shields.io/npm/v/babel-plugin-i18n-tag-translate.svg?style=flat)](https://www.npmjs.com/package/babel-plugin-i18n-tag-translate)

### JSON Schema
* [i18n-tag-schema](https://github.com/skolmer/i18n-tag-schema): JSON Schema based translation validation and tools [![npm version](https://img.shields.io/npm/v/i18n-tag-schema.svg?style=flat)](https://www.npmjs.com/package/i18n-tag-schema)
* [vscode-18n-tag-schema](https://github.com/skolmer/vscode-i18n-tag-schema): Visual Studio Code Extension for JSON Schema based translation validation and tools [![Marketplace Version](https://vsmarketplacebadge.apphb.com/version-short/skolmer.vscode-i18n-tag-schema.svg)](https://marketplace.visualstudio.com/items?itemName=skolmer.vscode-i18n-tag-schema)

## Credits

Thanks to [Jack Hsu](https://github.com/jaysoo) for his initial draft of an [i18n template literal](http://jaysoo.ca/2014/03/20/i18n-with-es6-template-strings/).

## License

Copyright (c) 2016-2019 Steffen Kolmer

This software is licensed under the MIT license.  See the `LICENSE` file
accompanying this software for terms of use.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/arthot"><img src="https://avatars1.githubusercontent.com/u/1815294?v=4" width="100px;" alt="Artem"/><br /><sub><b>Artem</b></sub></a><br /><a href="#infra-arthot" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/skolmer/es2015-i18n-tag/commits?author=arthot" title="Tests">⚠️</a> <a href="https://github.com/skolmer/es2015-i18n-tag/commits?author=arthot" title="Code">💻</a></td>
    <td align="center"><a href="http://nourish.je"><img src="https://avatars1.githubusercontent.com/u/1677829?v=4" width="100px;" alt="Steve Le Roy Harris"/><br /><sub><b>Steve Le Roy Harris</b></sub></a><br /><a href="#infra-simlrh" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/skolmer/es2015-i18n-tag/commits?author=simlrh" title="Tests">⚠️</a> <a href="https://github.com/skolmer/es2015-i18n-tag/commits?author=simlrh" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/SaiX123"><img src="https://avatars0.githubusercontent.com/u/29754416?v=4" width="100px;" alt="SaiX123"/><br /><sub><b>SaiX123</b></sub></a><br /><a href="#infra-SaiX123" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/skolmer/es2015-i18n-tag/commits?author=SaiX123" title="Tests">⚠️</a> <a href="https://github.com/skolmer/es2015-i18n-tag/commits?author=SaiX123" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/nor3"><img src="https://avatars3.githubusercontent.com/u/946620?v=4" width="100px;" alt="nor3"/><br /><sub><b>nor3</b></sub></a><br /><a href="https://github.com/skolmer/es2015-i18n-tag/commits?author=nor3" title="Tests">⚠️</a> <a href="https://github.com/skolmer/es2015-i18n-tag/commits?author=nor3" title="Code">💻</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
