import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    fullname: { type:String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    address: [{ type: String }],
    phoneNumber: [{ type: Number }],
},
{
    timestamps: true,
}
);

UserSchema.statics.findByEmailAndPhone = async ( { email, phoneNumber } ) => {
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });

    if ( checkUserByEmail || checkUserByPhone ) {
        throw new Error("USer already exist....!")
    }
    return false;
};

UserSchema.methods.generateJwtToken = function () {
    return jwt.sign({user: this.id.toString() }, "ZomatoApp");
};

UserSchema.pre("save", function (next) {
    const user = this;

    if(user.isMOdified("password")) return next();
    bcrypt.genSalt(8, (error, salt) => {
        if (error) return next(error);
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error);
            user.password = hash;
            return next();
        });
    });
});
export const UserModal = mongoose.model("Users", UserSchema);