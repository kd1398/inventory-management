import userSchema from "../models/User.js";

export const signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await userSchema.findOne({ email }).maxTimeMS(20000);
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

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userSchema.findOne({ email }).maxTimeMS(20000).select("+password");

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false,
            })
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false,
            });
        }

        const userData = {
            name: user.name,
            email: user.email,
            userRole: user.userRole,
            createdAt: user.createdAt,
        };

        // Respond with the user data in the JSON response
        res.status(200).json({
            message: "Login successful",
            success: true,
            user: userData, // Include the user data in the response
        });

        next();
    } catch (error) {
        console.log(error);
    }
}