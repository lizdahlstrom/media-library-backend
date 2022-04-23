import mysql from 'mysql2'

require('dotenv').config()

let database = process.env.DB_TEST_NAME // default is test for now
const environment = process.env.NODE_ENV?.trim() || ''

if (environment === 'production') database = process.env.DB_PROD_NAME

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database,
  password: process.env.DB_PASSWORD
})

export default pool.promise()
