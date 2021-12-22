import { NextFunction, Request, Response } from 'express'

import jwt from 'jsonwebtoken'

const CheckJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!process.env.JWT_TOKEN_USER) {
      return res.status(400).json({
        success: false,
        message: 'Hash not available!',
      })
    }
    const token = req.headers.token as string
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token not provided!',
      })
    }
    const userData = jwt.verify(token, process.env.JWT_TOKEN_USER || '') as any
    res.locals.uid = userData._id

    let currentTime = Date.now().valueOf() / 1000
    if (userData.exp < currentTime) {
      return res.json({
        success: false,
        message: 'Token expired!',
      })
    }
    next()
  } catch (err) {
    console.log('ERROR')
    console.log(err)
    return res.status(400).json({
      success: false,
      message: 'Unknown server error!',
    })
  }
}

export default CheckJWT
