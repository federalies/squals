// new to running typescript with node?
// you can just run the ts-wrapper over the repl : ts-node DIY-validator-cli.ts
// or if you want to dig in to how stuff works... you can run
//   `tsc DIY-validator-cli.ts && node -r esm DIY-validator-cli.js`
//
// this script  represents a VERY simple CLI app
// it expects you to pass in flag on the CLI after prefixed with ' -- '
// exmample `npx ts-node DIY-validator-cli.ts -- simple-static-website`

import getopts from 'getopts'
;(async cliInputs => {
  const opts = getopts(cliInputs)
  const modulesPathImportStrings = opts._.map(file => import(`./myComponents/recipies/${file}.ts`))
  // console.log({ modulesPathImportStrings })
  const modules = await Promise.all(modulesPathImportStrings).catch(e => console.error(e))
  console.log({ modules })
})(process.argv.slice(2))
