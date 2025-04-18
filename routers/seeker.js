import 'dotenv/config'
import QRCode from 'qrcode';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import sendResponse from '../helpers/sendResponse.js';
import express from 'express';
import Seeker from '../models/regester.js';
import { seekerRegisterSchema } from '../validation/seekerSchema.js';
import { authenticationReceptionist } from '../midelewear/authentication.js';

const router = express.Router()


// router.post("/seekerRegister", authenticationReceptionist, async (req, res) => {
//     const { error, value } = seekerRegisterSchema.validate(req.body);
//     if (error) return sendResponse(res, 400, null, true, error.message);

//     try {
//         let seeker = await Seeker.findOne({ cnic: value.cnic });

//         if (seeker) {
//             const newPurposes = value.purposes.filter(p => !seeker.purposes.includes(p));
//             if (newPurposes.length > 0) {
//                 seeker.purposes.push(...newPurposes);
//                 await seeker.save();
//             }
//         } else {
//             seeker = new Seeker({ ...value });
//             await seeker.save();
//         }

//         const token = jwt.sign(
//             { cnic: seeker.cnic, id: seeker._id },
//             process.env.AUTH_SECRET,
//         );

//         // const qrData = `http://localhost:4000/${seeker._id}`;
//         // const qrCodeImage = await QRCode.toDataURL(qrData);

//         return sendResponse(res, 200, { seeker, token, qrCodeImage }, false, "Seeker processed successfully");
//     } catch (err) {
//         return sendResponse(res, 500, null, true, "Server error while processing seeker: " + err);
//     }
// });


router.post("/seekerRegister", authenticationReceptionist, async (req, res) => {
    const { error, value } = seekerRegisterSchema.validate(req.body);
    if (error) return sendResponse(res, 400, null, true, error.message);

    try {
        const existingUser = await Seeker.findOne({ cnic: value.cnic });
        if (existingUser) {
            return sendResponse(res, 409, null, true, "CNIC already registered. Please use a unique CNIC.");
        }

        let newUser = new Seeker({ ...value });
        newUser = await newUser.save();

        const token = jwt.sign(
            { cnic: newUser.cnic, id: newUser._id },
            process.env.AUTH_SECRET,
        );

        const qrData = `http://192.168.10.2:4000/${newUser._id}`;
        const qrCodeImage = await QRCode.toDataURL(qrData);

        return sendResponse(res, 201, { newUser, token, qrCodeImage }, false, "User registered successfully");

    } catch (err) {
        return sendResponse(res, 500, null, true, "Server error while registering user" + err);
    }
});



export default router