import buble from 'rollup-plugin-buble';

export default {
  dest: './dist/api-codec-msgpack.js',
  entry: 'index.js',
  format: 'cjs',
  external: [
    'buffer',
    'msgpack-js',
    'stream'
  ],
  plugins: [
    buble()
  ]
};
