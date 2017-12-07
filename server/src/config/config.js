module.exports = {
  db: {
    database: process.env.DATABASE_URL
    options: {
      dialect: 'postgres'
    }
  }
}