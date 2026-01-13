import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files from root

// Database Setup
const db = new sqlite3.Database('./reputation.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initializeTables();
    }
});

function initializeTables() {
    db.serialize(() => {
        // Users Table (for future use/demo)
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            password TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Demo Requests Table
        db.run(`CREATE TABLE IF NOT EXISTS demo_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            business_name TEXT,
            email TEXT,
            phone TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
        console.log('Database tables initialized.');
    });
}

// Routes

// API: Request Demo
app.post('/api/request-demo', (req, res) => {
    const { name, businessName, email, phone } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and Email are required.' });
    }

    const sql = `INSERT INTO demo_requests (name, business_name, email, phone) VALUES (?, ?, ?, ?)`;
    db.run(sql, [name, businessName, email, phone], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to save request.' });
        }
        res.json({ message: 'Demo request submitted successfully!', id: this.lastID });
        console.log(`New lead captured: ${email}`);
    });
});

// API: Login (Mock/Simple)
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // For now, allow any login or check against DB if we were registering users
    // This is a placeholder for the "Login" functionality req

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required.' });
    }

    // Checking if user exists (Mock)
    const sql = `SELECT * FROM users WHERE email = ?`;
    db.get(sql, [email], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Database error.' });
        }
        // For MVP, just success if they try to login, or could implement reg
        res.json({ message: 'Login successful', token: 'mock-jwt-token-123' });
    });
});

// Serve frontend for any other route
app.get(/.*/, (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
