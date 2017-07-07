# cjsx2jsx

This project converts files from `.cjsx` file format to `.jsx` with modern javascript. Under the hood, this package applies the following transformations:

1. [coffee-react-transform](https://github.com/jsdf/coffee-react-transform)
2. [decaffeinate](https://github.com/decaffeinate/decaffeinate)
3. [react-createelement-to-jsx](https://github.com/flying-sheep/babel-plugin-transform-react-createelement-to-jsx)
3. [react-codemod: manual-bind-to-arrow](https://github.com/reactjs/react-codemod/blob/master/transforms/manual-bind-to-arrow.js)

## Usage

```
npm install -g cjsx2jsx
cjsx2jsx app/components/mycomponent.cjsx > app/components/mycomponent.jsx
```
