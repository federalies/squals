module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    tsConfig: {
      include: ['./src/**/*', './tests/**/*']
    }
  }
}
