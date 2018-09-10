require('source-map-support').install()

const {genSyntaxTestCases} = require('./_xform_syntax_variations')
describe @ 'Babel 6', @=> ::
  describe @ 'Syntax Errors', @=> ::
    genSyntaxTestCases @ it, iterSyntaxErrors()

function * iterSyntaxErrors() ::
  yield @{} expectSyntaxError: true
    title: 'syntax error on mixed tabs and spaces (same line)'
    source: @[]
      'first @'
      '  second @'
      '\t  third @'

  yield @{} expectSyntaxError: true
    title: 'syntax error on mixed tabs and spaces (cross lines)'
    source: @[]
      'first @'
      '  second @'
      '\t\t\t\tthird @'

  yield @{} expectSyntaxError: true
    title: 'syntax error on unterminated single-quote string'
    source: @[]
      'line1'
      'const sz = \'unterminated string example'
      'line3'

  yield @{} expectSyntaxError: true
    title: 'syntax error on unterminated double-quote string'
    source: @[]
      'line1'
      'const sz = "unterminated string example'
      'line3'

  yield @{} expectSyntaxError: true
    title: 'syntax error on unterminated regexp'
    source: @[]
      'line1'
      'const rx = /unterminated regex example'
      'line3'
