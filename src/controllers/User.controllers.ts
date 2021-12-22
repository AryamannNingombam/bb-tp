import { Request, Response, NextFunction } from 'express'
import UserModel from '../models/User.model'

export const GetUsersWithUsername = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username } = req.params
  if (!username)
    return res.status(400).json({
      success: false,
      message: 'Required values not provided',
    })
  UserModel.aggregate([
    { $match: { username: { $regex: username, $options: 'i' } } },
    {
      $addFields: {
        score: {
          $indexOfCP: [{ $toLower: '$username' }, { $toLower: username }],
        },
      },
    },
    { $sort: { score: 1 } },
  ])
    .then((users) => {
      return res.status(200).json({
        success: true,
        users,
      })
    })
    .catch((err) => {
      console.log('error')
      console.log(err)
      return res.status(400).json({
        success: false,
        message: 'Unknown server error!',
        err: err.message,
      })
    })
}

export const UploadUserDetails = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, name } = req.body
  if (!username || !name)
    return res.status(400).json({
      success: false,
      message: 'Required values not provided!',
    })
  UserModel.create({ username, name })
    .then((user) => {
      return res.status(200).json({
        success: true,
        message: 'User created successfully!',
        user,
      })
    })
    .catch((err) => {
      console.log('error')
      console.log(err)
      return res.status(400).json({
        success: false,
        message: 'Unknown server error!',
        err: err.message,
      })
    })
}
