// import * from '../__.config.js'
const conf = require('../__.config.js')
// const walk = require('walk')

console.log(conf())

// walk('../../../src', '-recursive') // vinyl stream?

// glob the `languages` folder looking for languages
/**
 * then maybe .pipe()
 *  // scan through the source code file looking for `__(`
 * asd
 * .then maybe .dest(fs.createWriteStream(en.json))
 *
 * Output should be:
 *      1 large file with keys for each desired language
 *      filename can include datetime or other entropy
 *      another util function can split it up an write separate files for each key
 *      since that part is harder to know if its valueable.
 */
