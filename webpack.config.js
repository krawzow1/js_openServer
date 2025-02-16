const path = require('path');

module.exports = {
    mode: 'development',
  entry: './js/script.js', // Входная точка
  output: {
    filename: 'bundle.js', // Имя выходного файла
    path: path.resolve(__dirname, 'dist'), // Папка для выходных файлов
  },
  watch: true,

  devtool: "source-map",
  module: {}
};