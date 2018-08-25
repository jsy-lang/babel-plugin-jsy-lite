const assert = require('assert')
const acorn = require('acorn-node')
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
    const ignore_tokens = new Set @
      '; eof'
      .split(/\s+/)

    const tokens =
      Array.from @
        acorn.tokenizer(res.code)
        token => token.type.label
      .filter @ token => token && ! ignore_tokens.has(token)

    if ('tokens' === testCase.debug) ::
      console.log @ tokens

    const expected_tokens = Array.from(testCase.tokens)
      .filter @ token => ! ignore_tokens.has(token)
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

