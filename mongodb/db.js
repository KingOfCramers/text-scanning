import mongoose from "mongoose";
export const loadDB = () => mongoose.connect('mongodb://localhost:27017/bots', { useNewUrlParser: true });