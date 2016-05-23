import path from 'path';
import fs from 'fs';
import assert from 'assert';
import i18n, { i18nConfig }  from '../dist/lib';

describe('i18n-tag-schema', () => {
    it(`should not translate`, () => {
        const name = 'Steffen'
        const amount = 1250.33

        const actual = i18n`Hello ${name}, you have ${amount}:c in your bank account.`

        const expected = "Hello Steffen, you have $1,250.33 in your bank account."
        assert.equal(actual, expected);
    })

    it(`should translate to german`, () => {
        const name = 'Steffen'
        const amount = 1250.33

        i18nConfig({
            locale: 'de-DE',
            currency: 'EUR',
            translations: {
                "Hello ${0}, you have ${1} in your bank account.": "Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto."
            }
        })

        const actual = i18n`Hello ${name}, you have ${amount}:c in your bank account.`

        const expected = "Hallo Steffen, Sie haben € 1,250.33 auf Ihrem Bankkonto."
        assert.equal(actual, expected);
    })
    
    it(`should have 12H date`, () => {
        const name = 'Steffen'
        const date = new Date(2012, 11, 20, 19, 0, 0);

        i18nConfig({
            date: { hour12: false }
        })

        let actual = i18n`Hello ${name}, the date is ${date}:t.`

        let expected = "Hello Steffen, the date is 2012-12-20 19:00:00."
        assert.equal(actual, expected);
        
        i18nConfig({
            date: { hour12: true }
        })

        actual = i18n`Hello ${name}, the date is ${date}:t.`

        expected = "Hello Steffen, the date is 2012-12-20 7:00:00 PM."
        assert.equal(actual, expected);
    })
})

