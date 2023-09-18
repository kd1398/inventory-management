import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
    select: false,
  },
  userRole: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Password hashed for security reasons prior to saving the user

// User.pre("save", async function () {
//     this.password = await bcrypt.hash(this.password, 12);
//   });
User.methods.comparePassword = function (candidatePassword) {
  // 'candidatePassword' is the plaintext password entered by the user
  // 'this.password' is the plaintext password stored in the database for the user
  console.log(candidatePassword);
  console.log(this.password);
  return candidatePassword === this.password;
};

const userSchema = mongoose.model("User", User);

export default userSchema;
