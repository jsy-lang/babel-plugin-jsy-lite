import rpi_jsy from 'rollup-plugin-jsy-lite'

const plugins = [rpi_jsy()]


export default [
  'index',
  'plugin',
].map(add_jsy)


function add_jsy(name) {
  return ({
    input: `code/${name}.jsy`,
    output: [
      { file: `cjs/${name}.js`, format: 'cjs', exports:'named' },
      { file: `umd/${name}.js`, format: 'umd', name, exports:'named' },
      { file: `esm/${name}.js`, format: 'es' },
    ],
    plugins
}) }
