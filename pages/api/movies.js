import Movies from "../../models/Movies";
import { initMongoose } from "@/lib/mongoose";

export default async function handler(req, res) {
    console.log("API route triggered : /api/movies");

    await initMongoose();
    console.log("Connected to DB, fetching Movies...");

    if (req.method === "POST") {
        try {
            console.log("📥 Yeni film alındı:", req.body);

            /*if (!req.body.title) {
                return res.status(400).json({ error: "Film başlığı eksik!" });
            } */

            const newMovie = new Movies(req.body);
            const savedMovie = await newMovie.save();

            console.log("✅ Film başarıyla kaydedildi:", savedMovie);
            return res.status(201).json(savedMovie);
        } catch (error) {
            console.error("❌ Film kaydedilirken hata:", error);
            return res.status(500).json({ error: "Sunucu hatası" });
        }
    }

    if (req.method === "GET") {
        try {
            const movies = await Movies.find().exec();
            console.log("Fetched Movies:", movies);

            res.json(movies);
        } catch (error) {
            console.error("Error fetching Movies:", error);
            res.status(500).json({ error: "Failed to fetch Movies" });
        }
    }
}