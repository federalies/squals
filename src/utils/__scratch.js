/**
 *  $> node -r esm  src/utils/__scratch.js > src/utils/edit_then_bookmarklet.js
 */

import fs from 'fs'
import path from 'path'
const codeStr = fs.readFileSync(path.join(__dirname, './_scratch.js')).toString()

const minify = s => {
  return s
    .toString()
    .replace(/\n/g, '')
    .replace(/ {2}/g, ' ')
    .replace(/\/\*.*\*\//g, '')
}

console.log(`javascript:{${minify(codeStr)}};void(0);`)
