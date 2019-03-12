// see this prior art to avoid hardcoding the the whole site tree in two places.
// @ref: https://github.com/alansouzati/react-router-to-array
//

module.exports = function render () {
  return {
    '/': '<html>Home</html>',
    '/hello': '<html>Hello</html>',
    '/world': '<html>World</html>'
  }
}
