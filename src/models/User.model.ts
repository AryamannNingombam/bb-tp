import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { GetAccountVerificationHash } from '../services/randomstring.service'

export interface UserDoc extends mongoose.Document {
  username: string
  name: string
  timestamp: Date
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: new Date(Date.now()),
  },
})

export default mongoose.model<UserDoc>('User', UserSchema)
