const redirected = () => ({
  // env is passed in
  devServer: {
    before: (app) => {
      // _ is the server
      app.get('/*', (req, res) => {
        res.redirect('/')
      })
    }
  }
})

module.exports = redirected
