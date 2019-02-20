#! node -r esm DIY-validator-cli.js
const getopts = require('getopts')

;(cliInputs => {
  const opts = getopts(cliInputs)
  const modules = opts._.map(
    file => require(`./myComponents/recipies/${file}.js`).default
  )
  console.log({ modules })
})(process.argv.slice(2))
