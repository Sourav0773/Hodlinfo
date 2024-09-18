import express from 'express';
import { fetchAndStoreTickers, getTickers } from '../controllers/tickersController.js';

const router = express.Router();

// Route to fetch and store tickers
router.get('/fetch-and-store', fetchAndStoreTickers);

// Route to retrieve stored tickers
router.get('/', getTickers);

export default router;
