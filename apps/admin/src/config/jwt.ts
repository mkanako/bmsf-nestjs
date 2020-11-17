export default () => ({
  secret: process.env.JWT_SECRET,
  exp: process.env.JWT_EXP || '1h',
})
