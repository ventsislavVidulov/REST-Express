import { model, Schema } from "mongoose";

const itemSchema = new Schema({
    make: { type: String },
    model: { type: String },
    year: {
        type: Number,
        min: [1950, 'Choose year between 1950 and 2050'],
        max: [2050, 'Choose year between 1950 and 2050']
    },
    description: { type: String },
    price: { type: Number,
    min: [0.01, 'Price must be positive']
    },
    img: { type: String },
    material: { type: String }
});

export const Item = model('Item', itemSchema);

