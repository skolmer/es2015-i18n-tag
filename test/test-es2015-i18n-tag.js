import assert from 'assert';
import i18n, { i18nConfig }  from '../lib';

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
        assert.equal(actual, expected);
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

        const expected = "Hallo Steffen, Sie haben € 1,250.33 auf Ihrem Bankkonto."
        assert.equal(actual, expected);
    })
    
    it(`should have 12H date`, () => {
        const name = 'Steffen'
        const date = new Date(2012, 11, 20, 19, 0, 0);

        i18nConfig({
            locales: 'de-DE',
            date: { 
                hour12: false 
            }
        })

        let actual = i18n`Hello ${name}, the date is ${date}:t.`

        let expected = "Hello Steffen, the date is 2012-12-20 19:00:00."
        assert.equal(actual, expected);
        
        i18nConfig({
            locales: 'de-DE',
            date: { 
                hour12: true 
            }
        })

        actual = i18n`Hello ${name}, the date is ${date}:t.`

        expected = "Hello Steffen, the date is 2012-12-20 7:00:00 PM."
        assert.equal(actual, expected);
    })
    
    it(`should format percentage`, () => {
        const name = 'Steffen'
        const percentage = 0.1;
        
        i18nConfig({
            locales: 'en-US'
        })

        let actual = i18n`Hello ${name}, the percentage is ${percentage}:p.`

        let expected = "Hello Steffen, the percentage is 10%."
        assert.equal(actual, expected);
    })
    
    it(`should support nested templates`, () => {
        const name = 'Steffen'
        const percentage = 0.1;
        
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

        let expected = `
        <users>
        
            <user name="Steffen">20%</user>
        
            <user name="Jack">80%</user>
        
        </users>`
        assert.equal(actual, expected);
    })
})

