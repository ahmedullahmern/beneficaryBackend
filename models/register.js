import mongoose from "mongoose";
const { Schema } = mongoose;

const seekerSchema = new Schema({
    email: { type: String, required: true },
    cnic: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    purpose: {
        type: String,
        required: [true, "Purpose is required"],
        enum: ['Medical', 'Education', 'Meat', 'Food', 'Shelter'], // optional: agar fixed list hai
    }, status: {
        type: String,
        enum: ['pending', 'inprocess', 'completed', 'rejected'],
        default: 'pending'
    },
    qrCodeUrl: { type: String },
    tokenNumber: { type: String, },
}, { timestamps: true });

const Seeker = mongoose.model("Seeker", seekerSchema);

export default Seeker;