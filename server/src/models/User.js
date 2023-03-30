import { model, Schema } from "mongoose";

const userSchema = new Schema({
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true  }
});

userSchema.index({email: 1}, {
    collation: {
        locale: 'en',
        strength: 1
    }
})

export const User = model('User', userSchema);