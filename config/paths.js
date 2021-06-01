const path = require('path')

module.exports = {
  src: path.resolve(__dirname, '../src'),        // Source files
  public: path.resolve(__dirname, '../public'),  // Static files that get copied to build folder
  build: path.resolve(__dirname, '../dist'), // Production build files
}
