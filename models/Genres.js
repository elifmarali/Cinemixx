import { Schema, models, model } from "mongoose";

const GenresSchema = new Schema({
    id: String,
    name: String
});

const Genres = models.Genres || model("Genres", GenresSchema, "Genres");

export default Genres;