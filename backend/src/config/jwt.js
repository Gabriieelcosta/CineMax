const jwtConfig = {
  secret: process.env.JWT_SECRET || 'dev_secret_change_in_production',
  sign: {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
}

module.exports = jwtConfig
