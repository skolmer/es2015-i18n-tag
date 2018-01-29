/* eslint-disable no-console */
const https = require('https')
const vm = require('vm')
const concat = require('concat-stream') 
const async = require('async')
const path = require('path')
const Benchmark = require('benchmark')
const suite = new Benchmark.Suite

function http_require(url, callback) {
  https.get(url, function(res) {
    res.setEncoding('utf8')
    res.pipe(concat({encoding: 'string'}, function(data) {
      const script = new vm.Script(data)
      const context = {}
      script.runInNewContext(context)
      callback(null, context['es2015-i18n-tag'])
    }))
  })
}

const libVersions = {
    '1.2.2': 'https://unpkg.com/es2015-i18n-tag@1.2.2/dist/lib/index.umd.min.js',
    '1.3.0': 'https://unpkg.com/es2015-i18n-tag@1.3.0/dist/lib/index.umd.min.js',
    '1.3.1': 'https://unpkg.com/es2015-i18n-tag@1.3.1/dist/lib/index.umd.min.js'
}

async.map(Object.values(libVersions), http_require, function(err, results) {
    for(let i = 0; i < results.length; i++) {
        const { default: i18n, i18nConfig, i18nGroup } = results[i]
        const i18nModule = { i18n, i18nConfig, i18nGroup }
        const version = `v${Object.keys(libVersions)[i]}`
        suite.add(version, () => Run.call(i18nModule, version), {
            'onStart': () => {
                Setup.call(i18nModule, version)
            }
        })
    }

    const currentLib = require(path.join(__dirname, 'dist/lib/index.umd.min.js'))
    const currentModule = { i18n: currentLib.default, i18nConfig: currentLib.i18nConfig, i18nGroup: currentLib.i18nGroup }
    suite.add('current', () => Run.call(currentModule, 'current'), {
        'onStart': () => {
            Setup.call(currentModule, 'current')
        }
    })

    suite.on('cycle', function(event) {
        console.log(String(event.target))
    })
    .on('complete', function() {
        console.log(`Fastest is ${this.filter('fastest').map('name')}`)
        console.log(`Slowest is ${this.filter('slowest').map('name')}`)
    })
    .run({ 'async': false })
})

function Setup() {
    this.i18nConfig({
        locales: 'de-DE',
        translations: {
            '1Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto.',
            '2Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto.',
            '3Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto.',
            '4Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto.',
            '5Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto.',
            '6Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto.',
            '7Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto.',
            '8Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto.',
            '9Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto.',
            '10Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto.',
            '11Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto.',
            '12Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto.',
            '13Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto.',
            '14Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto.'
        },
        number: {
            currency: 'EUR'
        }
    })
}

function Run() {
    const results = []

    const name = 'Steffen'
    const amount = 1250.33

    results.push(this.i18n`1Hello ${name}, you have ${amount}:c(USD) in your bank account.`)
    results.push(this.i18n`2Hello ${name}, you have ${amount}:c(EUR) in your bank account.`)
    results.push(this.i18n`3Hello ${name}, you have ${amount}:c(AUD) in your bank account.`)
    results.push(this.i18n`4Hello ${name}, you have ${amount}:n in your bank account.`)
    results.push(this.i18n`5Hello ${name}, you have ${amount}:c in your bank account.`)
    results.push(this.i18n`6Hello ${name}, you have ${amount}:c in your bank account.`)
    results.push(this.i18n`7Hello ${name}, you have ${amount}:c in your bank account.`)
    results.push(this.i18n`8Hello ${name}, you have ${amount}:c in your bank account.`)
    results.push(this.i18n`9Hello ${name}, you have ${amount}:c in your bank account.`)
    results.push(this.i18n`10Hello ${name}, you have ${amount}:c in your bank account.`)
    results.push(this.i18n`11Hello ${name}, you have ${amount}:c in your bank account.`)
    results.push(this.i18n`12Hello ${name}, you have ${amount}:c in your bank account.`)
    results.push(this.i18n`13Hello ${name}, you have ${amount}:c in your bank account.`)
    results.push(this.i18n`14Hello ${name}, you have ${amount}:c in your bank account.`)
    results.push(this.i18n`15Hello ${name}, you have ${amount}:c in your bank account.`)

    this.results = results
}