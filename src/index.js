import coffeeReactTransform from 'coffee-react-transform';
import { convert } from 'decaffeinate';
import { transform } from 'babel-core';
import removeRedundantContextTypes from './codemod/remove-redundant-context-types';
import createElementTransform from 'babel-plugin-transform-react-createelement-to-jsx';
import jscodeshift from 'jscodeshift';
import fs from 'fs';

require("babel-register")
({
  // This will override `node_modules` ignoring - you can alternatively pass
  // an array of strings to be explicitly matched or a regex / glob
  ignore: false,
  only: /react-codemod\/transforms/
});
const bindToArrowTransform = require('react-codemod/transforms/manual-bind-to-arrow').default;

export function run(args) {
  let fileName = args[0];
  let source = fs.readFileSync(fileName, 'utf8');
  source = coffeeReactTransform(source);
  source = convert(source, {disableBabelConstructorWorkaround: true}).code;
  source = transform(source, {
    plugins: [createElementTransform],
  }).code;

  // Returns null if there was nothing to transform
  const bindToArrowSource = bindToArrowTransform( {source: source}, {jscodeshift: jscodeshift});
  if (bindToArrowSource) {
    source = bindToArrowSource;
  }

  // Returns null if there was nothing to transform
  const removeRedundantContextTypesSource = removeRedundantContextTypes( {source: source}, {jscodeshift: jscodeshift});
  if (removeRedundantContextTypesSource ) {
    source = removeRedundantContextTypesSource; 
  }
  console.log(source);
}
