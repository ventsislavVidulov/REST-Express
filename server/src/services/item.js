import { Item } from "../models/Item.js";

async function getAll() {
    return Item.find({});
}

async function create(item) {
    const result = new Item({
        make: item.make,
        model: item.model,
        year: item.year,
        description: item.description,
        price: item.price,
        img: item.img,
        material: item.material,
        _ownerId: item._ownerId
    });

    await result.save();

    return result;
}

async function getById(id) {
    try {
        return await Item.findById(id);
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

async function updateById(id, item) {
    const existing = await Item.findById(id);

    if (existing) {
        existing.make = item.make;
        existing.model = item.model;
        existing.year = item.year;
        existing.description = item.description;
        existing.price = item.price;
        existing.img = item.img;
        existing.material = item.material;
        // console.log(existing);
        await existing.save();
        return existing;
    } else {
        const error = new Error('Not found');
        error._notFound = true;
        throw error;
    }
}

async function deleteById(id) {
    await Item.findByIdAndDelete(id);
}

export default {
    getAll,
    create,
    getById,
    updateById,
    deleteById
}