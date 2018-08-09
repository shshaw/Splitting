import size from 'rollup-plugin-filesize';
import { uglify } from 'rollup-plugin-uglify';
import { minify } from 'uglify-js';
import uglifyOptions from './compress.json';

export default {
  input: 'src/all.js', 
  output: [ 
    { file: 'dist/splitting.min.js', name: 'Splitting', format: 'umd' },
  ],
  plugins: [
    size(),
    uglify(uglifyOptions, minify)
  ]
}
