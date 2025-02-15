import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name is required"],
        trim: true,
        minlength: [2, "User name must be at least 2 characters long"],
        maxlength: [50, "User name must be at most 50 characters long"]
    },
    email: {
        type: String,
        required: [true, "User email is required"],
        trim: true,
        lowercase: true,
        unique: true,
        match: [
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,    
            "Please enter a valid email address"
        ]
    },
    password: {
        type: String,
        required: [true, "User password is required"],
        minlength: [6, "User password must be at least 6 characters long"],
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;

