import { Item } from "../models/item";

export async function getAll() {
    return Item.find({});
}

export async function create(item) {
    const result =  new Item({
        make: item.make,
        model: item.model,
        year: item.year,
        description: item.description,
        price: item.price,
        img: item.img,
        material: item.material
    });

    await result.save();

    return result;
}