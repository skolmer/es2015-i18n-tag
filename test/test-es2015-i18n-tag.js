import path from 'path';
import fs from 'fs';
import assert from 'assert';
import i18n, { i18nConfig }  from '../dist/lib';

describe('i18n-tag-schema', () => {
    it(`should not translate`, () => {
        const name = 'Steffen'
        const amount = 1250.33

        const actual = i18n`Hello ${ name }, you have ${ amount }:c in your bank account.`
        
        const expected = "Hello Steffen, you have $1,250.33 in your bank account."
        assert.equal(actual, expected);
    })
    
    it(`should translate to german`, () => {
        const name = 'Steffen'
        const amount = 1250.33
        
        i18nConfig('de-DE', 'EUR', {
            "Hello ${0}, you have ${1} in your bank account.": "Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto."
        })

        const actual = i18n`Hello ${ name }, you have ${ amount }:c in your bank account.`
        
        const expected = "Hallo Steffen, Sie haben € 1,250.33 auf Ihrem Bankkonto."
        assert.equal(actual, expected);
    })
})

