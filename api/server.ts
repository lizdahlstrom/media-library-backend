import express, { Express, Request, Response, Errback } from 'express'

require('dotenv').config()
const app: Express = express()

// Middleware
app.use(express.json()) // parse json bodies in the request object

// Global Error Handler. function params MUST start with err
app.use((err, req: Request, res: Response, next: Errback) => {
  console.log(err.stack)
  console.log(err.name)
  console.log(err.code)

  res.status(500).json({
    message: 'Something went rely wrong'
  })
})

// Listen on pc port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
