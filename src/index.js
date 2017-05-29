
import coffeeReactTransform from 'coffee-react-transform';
import { convert } from 'decaffeinate';
import { transform } from 'babel-core';
import createElementTransform from 'babel-plugin-transform-react-createelement-to-jsx';
import fs from 'fs';

export function run(args) {
  let fileName = args[0];
  let source = fs.readFileSync(fileName, 'utf8');
  source = coffeeReactTransform(source);
  source = convert(source).code;
  source = transform(source, {
    plugins: [createElementTransform],
  }).code;
  console.log(source);
}