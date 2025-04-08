import 'dotenv/config'
import bcrypt from 'bcrypt'
import sendResponse from '../helpers/sendResponse.js';
import { loginSchema, registerSchema } from '../validation.js/authvalidation.js';
import express from 'express';
import Seeker from '../models/seeker.js';

const router = express.Router()

router.post("/seekerRgister", async (req, res) => {
    const { cnic, name, phone, adress, purpose } = req.body;
    console.log("req.body==>", req.body)
    if (error) return sendResponse(res, 400, null, true, error.message)
    const user = await Seeker.findOne({ cnic: value.cnic })
    if (user) return sendResponse(res, 403, null, true, "User With This Email already Exist");
    var token = jwt.sign(user, process.env.AUTH_SECRET);
    let newUser = new Seeker({ ...value });
    newUser = await newUser.save()
    sendResponse(res, 201, newUser, false, "Seeker  Register successfully")
})


// router.post("/login", async (req, res) => {
//     console.log("req.User==>", req.user)
//     const { error, value } = loginSchema.validate(req.body);
//     if (error) return sendResponse(res, 400, null, true, error.message)
//     const user = await User.findOne({ email: value.email }).lean()
//     if (!user) return sendResponse(res, 403, null, true, "User not Registered.")
//     const isPasswordValid = await bcrypt.compare(value.password, user.password)
//     if (!isPasswordValid) return sendResponse(res, 403, null, true, "Invalid  Credentails")
//     var token = jwt.sign(user, process.env.AUTH_SECRET);
//     sendResponse(res, 200, { user, token }, false, "User Login successfully")
// })

export default router