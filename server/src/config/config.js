module.exports = {
  port: 8081,
  db: {
    // change this with process.env.DATABASE_URL in the future
    databaseURL: 'postgres://cyhqwpgxezzsiy:f67e2de03bb5fd2ea49b5fcef56898083d882ae9c88672f5188b026c0da1adb9@ec2-184-73-189-190.compute-1.amazonaws.com:5432/d3f8dhq054cbbf',
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    },
    port: 5432,
    host: 'ec2-184-73-189-190.compute-1.amazonaws.com'
  }

}