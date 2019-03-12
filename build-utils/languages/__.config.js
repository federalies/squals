// const globby = require('globby')
// use this file to determine if your files are more imporant or if the hard coding is more important

const fs = require('fs')
const path = require('path')

let exists = configList => {
  return configList.filter(lang => lang !== 'en')
    .map(lang => {
      const lPath = `${lang}.json`
      try {
        const l = require(`./${lPath}`)
        return {
          lang,
          keys: Object.keys(l),
          n: Object.keys(l).length,
          createdAt: new Date(fs.statSync(path.resolve(__dirname, lPath)).birthtime).getTime()
        }
      } catch (err) {
        console.log(`lang: ${lang} - could not be processed - assuming it needs to be retranslated`)
        return {
          lang,
          n: 0,
          keys: [],
          createdAt: new Date(fs.statSync(path.resolve(__dirname, lPath)).birthtime).getTime()
        }
      }
    })
}

const translationList = [ 'en', 'de', 'es', 'fr', 'hi', 'it', 'jp', 'nl', 'pt', 'zh' ]

let config = function () {
  return {
    defaultLang: 'en',
    translateTo: translationList,
    existing: exists(translationList)
  }
}

module.exports = config
