# SQUALS

> (a squall) : the advancing edge of a thunderstorm, accompanied with high winds

[![squals logo](/assets/readme-art.svg)](http://squals.federali.es)

**Squals** is an idiomatic cloudformation generator that makes it incredibly easy to share your setups via `npm`, `gist` or similair service.

AWS (+ Google Cloud, + Azure) have wonderfuly robust infrastructure offerings, but with that comes a not so wonderfully complicated system, documentation, and methods to make all your cloud components.

Much like React/Vue/Hyperapp have added a reaonable encapulation levels to working with HTMLnodes in their various trees. Squals aims to make resuable components. that can be shared, easily added, and most importantly understood with much of the obtuse details ecapsulated away in to the framework.

Because the benefits significantly outweigh the downsides - a declarative componet manifest approach makes the most sense to acomplish creating cloud components. So for squals will support AWS cloudformation, and (eventually) Azure Resource Manager, Google Cloud Resourece Manager too.

The project goals are to make systems more composeable, contextual, shareable, and done in modern js (or typescript) patterns.

## Goals:

- Allow a slow building up interfaces via function values - but also allowing an imperative approach.
- Layer Up a Declarative Interfaces via resuable composable functions rather than inert markup.
- Round off the sharp edges of dealing with `AWS::cloudformation` templates
- Sharable Components & HOCs
- Decompose Recompose Princples

## Installation

`git clone https://github.com/federalies/squals.git squals && cd $_ && npm i`

## Usage

> See Examples folder

`node -r esm examples/DIY-validator-cli.js`

or

`node -r esm examples/pre-n-postValidate.js`

## Docs

[WIP Docs](https://raw.githack.com/federalies/squals/master/docs/index.html)
