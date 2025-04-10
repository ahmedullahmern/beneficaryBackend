import 'dotenv/config'
import bcrypt from 'bcrypt'
import sendResponse from '../helpers/sendResponse.js';
import express from 'express';
import Seeker from '../models/regester.js';
import { seekerRegisterSchema } from '../validation.js/seekerSchema.js';
import { authenticationReceptionist } from '../midelewear/authentication.js';

const router = express.Router()

router.post("/seekerRgister", authenticationReceptionist, async (req, res) => {
    console.log("req==>", req)
    const { error, value } = seekerRegisterSchema.validate(req.body);
    if (error) return sendResponse(res, 400, null, true, error.message)
    const user = await Seeker.findOne({ cnic: value.cnic })
    if (user) return sendResponse(res, 403, null, true, "User With This CNIC already Exist");
    const hashedPassword = await bcrypt.hash(value.password, 12)
    value.password = hashedPassword;
    let newUser = new Seeker({ ...value });
    newUser = await newUser.save()
    sendResponse(res, 201, newUser, false, "User Register successfully")
})

export default router