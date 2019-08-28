module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'src/index.html',
      filename: 'index.html'
    },
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        // {from: /\/index/, to: '/index.html'}, // index.html に飛ばす
        // {from: /\/signin/, to: '/signin.html'}
      ]
    }
  }
}
