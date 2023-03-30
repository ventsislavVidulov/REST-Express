import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from "../models/User.js";

const JWT_SECRET = 'onrvnnosnvjolsfnvolnsjlvnvolnjfnen';

async function register(email, password) {
    //Checking if the email is used
    const existing = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    //  console.log( new RegExp(`^${email}$`, 'i'));
    if (existing) {
        throw new Error('Email is taken');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        email,
        hashedPassword
    });

    await user.save();

    return createSession(user);
}


async function login(email, password) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    if (!user) {
        throw new Error('Wrong email or password');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match) {
        throw new Error('Wrong email or password');
    }

    return createSession(user);
}


function createSession(user) {
    const payload = {
        email: user.email,
        _id: user._id
    };

    const accessToken = jwt.sign(payload, JWT_SECRET);

    return {
        email: user.email,
        accessToken,
        _id: user._id
    };
}


export default {
    register,
    login
};