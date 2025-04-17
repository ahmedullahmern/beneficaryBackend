import mongoose from "mongoose";
const { Schema } = mongoose;

const seekerSchema = new Schema({
    email: { type: String, required: true },
    cnic: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    purposes: { type: String, required: true },
}, { timestamps: true });

const Seeker = mongoose.model("Seeker", seekerSchema);

export default Seeker;