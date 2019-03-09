module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    tsConfig: {
      include: ['./src/**/*.ts', './tests/**/*.ts'],
      // include: ['.**/*.ts']
      exclude: ['dist']
    }
  }
}
