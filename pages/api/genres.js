import Genres from "../../models/Genres";
import { initMongoose } from "@/lib/mongoose";

export default async function handler(req, res) {
    console.log("API Route Triggered: /api/genres");

    await initMongoose();
    console.log("Connected to DB, fetching genres...");

    try {
        const genres = await Genres.find().exec();
        console.log("Fetched Genres:", genres);

        res.json(genres);
    } catch (error) {
        console.error("Error fetching genres:", error);
        res.status(500).json({ error: "Failed to fetch genres" });
    }
}
