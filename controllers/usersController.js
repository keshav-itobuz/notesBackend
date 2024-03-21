import User from '../model/userModel.js';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt'

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export async function registerUser(req, res) {
    try {
        if(!req.body.email.match(emailRegex)){
            throw new Error("Email is not valid")
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        await user.save();
        res.status(StatusCodes.OK).json({ data: req.body, message: 'Succesfully Created' });
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND).json({ data: "undefined", message: `Error : ${err}` });
    }
}

export async function loginUser(req, res) {
    try {
        const userAuth = await User.findOne({ email: req.body.email });
        if (!userAuth) {
            res.status(StatusCodes.NOT_ACCEPTABLE).json({ data: "undefined", message: "user Doesn't exists" });
            return;
        }
        else {
            const passwordMatch = await bcrypt.compare(req.body.password, userAuth.password);
            if (!passwordMatch) {
                res.status(StatusCodes.NOT_ACCEPTABLE).json({ data: "undefined", message: "Wrong Password" });
                return;
            }
        }

        res.status(StatusCodes.OK).json({ data: req.body, message: 'Succesfully Signed in' });
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND).json({ data: "undefined", message: `Error : ${err}` });
    }
}