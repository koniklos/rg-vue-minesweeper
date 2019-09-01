module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    output: {
      filename: "minesweeper.js"
    }
  },
  css: {
    extract: false
  },
  filenameHashing: false
};
