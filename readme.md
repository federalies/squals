# SQUALS

> (a squall) : the advancing edge of a thunderstorm, accompanied with high winds

[![squals logo](/assets/readme-art.svg)](http://squals.federali.es)

**Squals** is an idiomatic cloudformation generator that makes it incredibly easy to share your setup via `npm` or similair.

The project goals are to make the system more composeable, contextual, shareable, and done in modern js (actually built in typescript) patterns.

## Goals:

- Layer Up a Declarative Interface via resuable composable functions rather than inert markup.
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

[WIP Documentation](https://rawcdn.githack.com/federalies/squals/3dbe6d52d92cd589eafe9946dd3cbdfe17f6e194/docs/index.html)
