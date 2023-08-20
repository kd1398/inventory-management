import mongoose from 'mongoose';

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userRole: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

// Password hashed for security reasons prior to saving the user

// User.pre("save", async function () {
//     this.password = await bcrypt.hash(this.password, 12);
//   });

const userSchema = mongoose.model('User', User);

export default userSchema;