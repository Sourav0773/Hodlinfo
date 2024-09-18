import fetch from 'node-fetch';
import { getDb } from '../config/database.js';

// Fetch and store tickers from the API
export const fetchAndStoreTickers = async (req, res) => {
    try {
        const response = await fetch('https://api.wazirx.com/api/v2/tickers');
        const data = await response.json();
        const tickers = Object.values(data).slice(0, 10).map(ticker => ({
            name: ticker.name,
            last: ticker.last,
            buy: ticker.buy,
            sell: ticker.sell,
            volume: ticker.volume,
            base_unit: ticker.base_unit
        }));

        const db = getDb();
        const collection = db.collection("tickers");

        for (let ticker of tickers) {
            await collection.updateOne(
                { name: ticker.name, base_unit: ticker.base_unit },
                { $set: ticker },
                { upsert: true }
            );
        }

        res.send("Data fetched and stored successfully!");
    } catch (e) {
        console.error("Error during fetch and store:", e);
        res.status(500).send("Failed to fetch or store data");
    }
};

// Get tickers from the database
export const getTickers = async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection("tickers");
        const tickers = await collection.find({}).toArray();
        res.json(tickers);
    } catch (e) {
        console.error("Error fetching tickers:", e);
        res.status(500).send("Failed to retrieve data");
    }
};
