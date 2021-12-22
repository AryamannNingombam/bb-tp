import express from 'express'
import {
  GetUsersWithUsername,
  UploadUserDetails,
} from '../controllers/User.controllers'
import CheckJWT from '../middleware/jwt.middleware'
const router = express.Router()

//all get requests;
router.get('/get-users-with-username/:username', GetUsersWithUsername)
//all post requests;
router.post('/upload-user-details', UploadUserDetails)
//all put requests;

//all delete requests;

export { router as UserRoutes }
