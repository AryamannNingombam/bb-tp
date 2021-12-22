require('dotenv').config({
  path: __dirname + '/.env',
})
import { Request, Response, NextFunction } from 'express'
import express from 'express'
import { UserRoutes } from './src/routes/User.routes'
import { connectToDB } from './src/config/db.config'

const cors = require('cors')
const app = express()

const whitelist = ['*']

var corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}

app.use(cors())

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use((req: Request, res: Response, next: NextFunction) => {
  express.json({
    limit: '50mb',
  })(req, res, (err: Error) => {
    if (err) {
      console.error(err)
      return res.status(400).json({
        success: false,
      })
    }
    next()
  })
})

app.use(express.urlencoded())
app.use(express.json())
app.use('/api/user', UserRoutes)
app.get('/welcome', (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    success: true,
    message: 'Welcome to my api!',
  })
})
const PORT = process.env.PORT || 8080
app.listen(PORT, async () => {
  await connectToDB()
  console.log('working...')
})
