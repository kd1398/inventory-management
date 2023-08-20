import userSchema from "../models/User.js";

const signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await userSchema.findOne({ email }).maxTimeMS(20000);;
        if (user) {
            return res.status(400).json({
                message: "User already exist",
                success: false,
            });
        }
        const newUser = await userSchema.create({
            name,
            email,
            password,
        });
        res
            .status(201)
            .json({ message: "User signed in successfully", success: true, newUser });
        next();
    } catch (error) {
        console.log(error);
    }
}

export default signUp;