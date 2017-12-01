const path = require('path')
const webpack = require('webpack')

module.export default({
  entry: {
    index: [
      path.join(__dirname, '../src/public/scripts/index.es'),
      path.join(__dirname, '../src/public/scripts/indexspec.js')
    ],
    tags: [
      path.join(__dirname, '../src/public/scripts/tags.es')
    ]
  }
  output: {
    filename: 'public/scripts/[name]-[hash:5].js',
    path: path.join(__dirname,'../dist/')
  }
})
