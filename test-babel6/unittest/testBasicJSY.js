require('source-map-support').install()

const {genSyntaxTestCases} = require('./_xform_syntax_variations')
describe @ 'Babel 6', @=> ::
  describe @ 'JSY Smoke Tests', @=> ::
    genSyntaxTestCases @ it, iterWhileSyntaxSmokeTest()

function * iterWhileSyntaxSmokeTest() ::
  // while (expr) body variations

  yield @{} expectValid: true
    title: 'vanilla while statement'
    source: @[] 'while (expr) { blockStatement }'
    tokens: @[] 'while', '(', 'name', ')', '{', 'name', '}', 'eof'

  yield @{} expectValid: true
    title: 'offside while statement'
    source: @[] 'while (expr) :: blockStatement'
    tokens: @[] 'while', '(', 'name', ')', '{', 'name', '}', 'eof'

  yield @{} expectValid: true
    title: 'offside while statement, multiline'
    source: @[]
      'while (expr) ::'
      '  blockStatement'
    tokens: @[] 'while', '(', 'name', ')', '{', 'name', '}', 'eof'

  yield @{} expectValid: true
    title: 'keyword offside while statement'
    source: @[] 'while expr :: blockStatement'
    tokens: @[] 'while', '(', 'name', ')', '{', 'name', '}', 'eof'

  yield @{} expectValid: true
    title: 'keyword offside while statement, multiline'
    source: @[]
      'while expr ::'
      '  blockStatement'
    tokens: @[] 'while', '(', 'name', ')', '{', 'name', '}', 'eof'

