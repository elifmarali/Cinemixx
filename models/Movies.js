import { Schema, models, model } from "mongoose";

const MoviesSchema = new Schema({
    adult: Boolean,
    backdrop_path: String,
    genre_ids: [Number],
    id: String,
    original_language: String,
    original_title: String,
    overview: String,
    popularity: Number,
    poster_path: String,
    release_date: { type: Date, default: null },
    title: String,
    video: Boolean,
    vote_average: Number,
    vote_count: Number,
    vote: Number,
    file: String
});

const Movies = models.Movies || model("Movies", MoviesSchema, "Movies");

export default Movies;
