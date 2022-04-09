import express, { Express, Request, Response, NextFunction } from 'express'
import mediaRouter from './routes/mediaItemRoutes'

require('dotenv').config()
const app: Express = express()

// Middleware
app.use(express.json()) // parse json bodies in the request object

app.use('/media', mediaRouter)

// Global Error Handler. function params MUST start with err
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err.stack)
  console.log(err.name)
  console.log(err.code)

  res.status(500).json({
    message: 'Something went wrong'
  })
})

// Listen on pc port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
