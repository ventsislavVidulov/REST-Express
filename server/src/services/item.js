import { Item } from "../models/Item.js";

async function getAll(query) {
    if (query) {
        const userId = query.split('=')[1].slice(1, -1);
        return Item.find({ _ownerId: userId });
    }
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

async function updateById(existing, item) {

    existing.make = item.make;
    existing.model = item.model;
    existing.year = item.year;
    existing.description = item.description;
    existing.price = item.price;
    existing.img = item.img;
    existing.material = item.material;

    await existing.save();
    return existing;

}

async function deleteById(item) {
    await Item.findByIdAndDelete(item._id);
}

export default {
    getAll,
    create,
    getById,
    updateById,
    deleteById
}