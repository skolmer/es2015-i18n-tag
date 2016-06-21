import assert from 'assert'
import Intl from 'intl'
import i18n, { i18nConfig }  from '../lib'

Intl.__applyLocaleSensitivePrototypes()
global.Intl = Intl

describe('es2015-i18n-tag', () => {
    it(`should not translate`, () => {
        const name = 'Steffen'
        const amount = 1250.33

        i18nConfig({
            locales: 'en-US',
            number: {
                currency: 'USD'
            }
        })

        const actual = i18n`Hello ${name}, you have ${amount}:c in your bank account.`

        const expected = "Hello Steffen, you have $1,250.33 in your bank account."
        assert.equal(actual, expected)
    })

    it(`should translate to german`, () => {
        const name = 'Steffen'
        const amount = 1250.33

        i18nConfig({
            locales: 'de-DE',
            translations: {
                "Hello ${0}, you have ${1} in your bank account.": "Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto."
            },
            number: {
                currency: 'EUR'
            }
        })

        const actual = i18n`Hello ${name}, you have ${amount}:c in your bank account.`

        const expected = "Hallo Steffen, Sie haben 1.250,33 € auf Ihrem Bankkonto."
        assert.equal(actual, expected)
    })

    it(`should format percentage`, () => {
        const name = 'Steffen'
        const percentage = 0.1

        i18nConfig({
            locales: 'en-US'
        })

        let actual = i18n`Hello ${name}, the percentage is ${percentage}:p.`

        let expected = "Hello Steffen, the percentage is 10%."
        assert.equal(actual, expected)
    })

    it(`should support nested templates`, () => {
        i18nConfig({
            locales: 'en-US'
        })

        let hello = [
            { name: "Steffen", percentage: 0.2 },
            { name: "Jack", percentage: 0.8 }
        ]

        let actual = i18n`
        <users>
        ${hello.map((item) => i18n`
            <user name="${item.name}">${item.percentage}:p</user>
        `).join('')}
        </users>`

        let expected = `\n        <users>\n        \n            <user name="Steffen">20%</user>\n        \n            <user name="Jack">80%</user>\n        \n        </users>`
        assert.equal(actual, expected)
    })

    it(`should support standard date format string "d"`, () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        let actual = i18n`The date is ${date}:t(d).`

        let expected = "The date is 12/20/2012."
        assert.equal(actual, expected)

    })

    it(`should support standard date format string "D"`, () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        let actual = i18n`The date is ${date}:t(D).`

        let expected = "The date is Thursday, December 20, 2012."
        assert.equal(actual, expected)

    })

    it(`should support standard date format string "f"`, () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        let actual = i18n`The date is ${date}:t(f).`

        let expected = "The date is Thursday, December 20, 2012 at 6:00 PM."
        assert.equal(actual, expected)

    })

    it(`should support standard date format string "F"`, () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        let actual = i18n`The date is ${date}:t(F).`

        let expected = "The date is Thursday, December 20, 2012 at 6:00:00 PM."
        assert.equal(actual, expected)

    })

    it(`should support standard date format string "g"`, () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        let actual = i18n`The date is ${date}:t(g).`

        let expected = "The date is 12/20/2012, 6:00 PM."
        assert.equal(actual, expected)

    })

    it(`should support standard date format string "G"`, () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        let actual = i18n`The date is ${date}:t(G).`

        let expected = "The date is 12/20/2012, 6:00:00 PM."
        assert.equal(actual, expected)

    })
    
    it(`should support standard date format string "M", "m"`, () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        let actual = i18n`The date is ${date}:t(m).`

        let expected = "The date is December 20."
        assert.equal(actual, expected)
    })

    it(`should support standard date format string "O", "o"`, () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        let actual = i18n`The date is ${date}:t(o).`

        let expected = "The date is 2012-12-20T18:00:00.000Z."
        assert.equal(actual, expected)
    })

    it(`should support standard date format string "R", "r"`, () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        let actual = i18n`The date is ${date}:t(r).`

        let expected = "The date is Thu, 20 Dec 2012 18:00:00 GMT."
        assert.equal(actual, expected)
    })
    
    it(`should support standard date format string "t"`, () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        let actual = i18n`The date is ${date}:t(t).`

        let expected = "The date is 6:00 PM."
        assert.equal(actual, expected)

    })
    
    it(`should support standard date format string "T"`, () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        let actual = i18n`The date is ${date}:t(T).`

        let expected = "The date is 6:00:00 PM."
        assert.equal(actual, expected)

    })
    
    it(`should support standard date format string "Y", "y"`, () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        let actual = i18n`The date is ${date}:t(y).`

        let expected = "The date is December 2012."
        assert.equal(actual, expected)
    })

    it('should support custom standard formatters', () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'de-DE',
            standardFormatters: {
                number: {
                    x: (locales, numberOptions, value) => value.toLocaleString(locales, Object.assign({}, numberOptions, { style: 'percent' }))
                },
                date: {
                    x: () => 'test'
                },
                string: {
                    z: () => 'test321'
                }
            }
        })

        let actual = i18n`${0.77}:n(x) ${date}:t(x) ${'test123'}:s(z)`

        let expected = '77 % test test321'
        assert.equal(actual, expected)
    })
})

