import { model, Schema } from "mongoose";

const itemSchema = new Schema({
    make: { type: String },
    model: { type: String },
    year: { type: Number },
    description: { type: String },
    price: { type: Number },
    img: { type: String },
    material: { type: String }
});

export const Item = model('Item', itemSchema);

