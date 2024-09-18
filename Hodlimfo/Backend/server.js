import express from 'express';
import cors from 'cors';
import { connectToDb } from './config/database.js';
import tickersRoutes from './routes/tickers.js';

const app = express();
const port = 3000;


app.use(cors()); 

// Middleware for parsing JSON
app.use(express.json());

// Connect to MongoDB and start the server
async function startServer() {
    try {
        await connectToDb(); // Connect to MongoDB
        console.log("Connected to MongoDB");

        // Use tickers routes
        app.use('/tickers', tickersRoutes);

        // Start the server
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}/`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
    }
}

startServer();
