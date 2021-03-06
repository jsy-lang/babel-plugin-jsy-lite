const babel = require('babel-core')

const babel_opt = @{}
  babelrc: false
  highlightCode: false
  plugins: @[]
    'babel-plugin-jsy-lite'
    'syntax-async-generators'
    'syntax-class-properties'
    'syntax-dynamic-import'

function jsy_as_babel_ast(jsy_code, expect_error) ::
  if Array.isArray(jsy_code) ::
    jsy_code = jsy_code.join('\n')

  try ::
    return babel.transform @ jsy_code, babel_opt
  catch err ::
    if expect_error :: throw err

    console.error @# jsy_code.split(/\r?\n/)
    throw new Error @ `Babel transform error: ${err.message}`

module.exports = exports = jsy_as_babel_ast

