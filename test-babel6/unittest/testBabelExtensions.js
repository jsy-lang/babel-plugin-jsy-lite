require('source-map-support').install()

const {genSyntaxTestCases} = require('./_xform_syntax_variations')
describe @ 'Babel 6', @=> ::
  describe @ 'Extension Support', @=> ::
    genSyntaxTestCases @ it, iterBabelSupport()


function * iterBabelSupport() ::
  yield @{} expectValid: true
    title: 'async generator Babel extension'
    source: @[]
      'async function * agen() ::'
      '  while 1 ::'
      '    const s = await sleep()'
      '    yield s'

    tokens: @[]
      'name', 'function', '*', 'name', '(', ')', '{',
        'while', '(', 'num', ')', '{',
          'const', 'name', '=', 'name', 'name', '(', ')',
          'name', 'name',
        '}',
      '}', 'eof'

  yield @{} expectValid: true
    title: 'class properties Babel extension'
    source: @[]
      'class SomeClassName ::'
      '  a = 1942'
      '  b = "string"'
      '  static c = true'

    tokens: null

  yield @{} expectValid: true
    title: 'dynamic import Babel extension'
    source: @[]
      'const m = import("some-module")'

    tokens: null

