const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const signupSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "firstName is required"],
    },
    lastName: {
        type: String,
        required: [true, "lastName is required"],
    },
    mobile: {
        type: Number,
        required: [true, "Mobile number is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        validate: {
            validator: validator.isEmail
        }
    },
    dob: {
        type: String,
        required: [true, "DOB is required"],
    },
    gender: {
        type: String,
        required: [true, "gender is required"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    confirmPassword: {
        type: String,
        required: [true, "confirm password is required"],
    },
    cart: [ { type: Object }]
});

signupSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = null;

    next();
})

const UserModel = mongoose.model('User', signupSchema);

module.exports = {
    UserModel
}