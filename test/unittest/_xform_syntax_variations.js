const assert = require('assert')
const jsy_as_babel_ast = require('./_jsy_as_babel_ast')

function testSyntaxError(testCase) ::
  const block = () => ::
    if (testCase.debug) ::
      console.dir @ testCase.source, @{} colors: true, depth: null

    let res = jsy_as_babel_ast @ testCase.source

    if 'code' === testCase.debug ::
      console.dir @ res.code.split('\n'), @{} colors: true, depth: null
    if 'ast' === testCase.debug ::
      console.dir @ res.ast, @{} colors: true, depth: null

  assert.throws @ block, SyntaxError

function testSourceTransform(testCase) ::
  let res
  try ::
    if testCase.debug ::
      console.dir @ testCase.source, @{} colors: true, depth: null

    res = jsy_as_babel_ast @ testCase.source
  catch (err) ::
    console.error @ err
    assert.fail @ err.message

  if 'code' === testCase.debug ::
    console.dir @ res.code.split('\n'), @{} colors: true, depth: null
  if 'ast' === testCase.debug ::
    console.dir @ res.ast, @{} colors: true, depth: null

  if testCase.tokens ::
    const tokens = res.ast.tokens
      .map @ token => token.type.label
      .filter @ Boolean

    assert.deepEqual @ tokens.pop(), 'eof'

    if ('tokens' === testCase.debug) ::
      console.log @ tokens
    const expected_tokens = Array.from(testCase.tokens)
      .filter @ token => token !== 'eof'
    assert.deepEqual @ tokens, expected_tokens


function genSyntaxTestCases(it, iterable_test_cases) ::
  for (const testCase of iterable_test_cases) ::
    let testFn, title=testCase.title
    if (testCase.expectSyntaxError) ::
      title += ' should THROW a syntax error'
      testFn = @=> testSyntaxError(testCase)
    else ::
      testFn = @=> testSourceTransform(testCase)

    if (testCase.skip) ::
      it.skip @ title, testFn
    else if (testCase.todo) ::
      it.todo @ title, testFn
    else if (testCase.only) ::
      it.only @ title, testFn
    else ::
      it @ title, testFn


Object.assign @ exports, @{}
  genSyntaxTestCases
  testSourceTransform
  testSyntaxError

