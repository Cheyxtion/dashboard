const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- MIDDLEWARE ---
app.use(cors()); // IZIN AKSES: Supaya website kamu bisa narik data dari sini
app.use(express.json()); // Supaya server bisa baca data format JSON

// --- 1. KONEKSI KE MONGODB ---
// Pastikan di Render.com kamu sudah setting Environment Variable MONGO_URI
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Berhasil Terhubung ke MongoDB!'))
  .catch(err => console.error('❌ Gagal Koneksi ke Mongo:', err));

// --- 2. DEFINISI SCHEMA ---
// Ini harus sama persis dengan nama field di database Bot kamu
const userSchema = new mongoose.Schema({
    username: String,
    ct_wallet: { type: Number, default: 0 },
    ct_bank: { type: Number, default: 0 }
});

// 'User' = Nama Model
// 'users' = Nama Collection di MongoDB kamu (cek di MongoDB Compass/Atlas)
const User = mongoose.model('User', userSchema, 'users');

// --- 3. ENDPOINT API ---
app.get('/api/leaderboard', async (req, res) => {
    try {
        console.log("Ada yang minta data leaderboard...");
        
        // Ambil 10 orang terkaya (sort berdasarkan ct_wallet + ct_bank)
        const topUsers = await User.find()
            .sort({ ct_wallet: -1 }) // Sortir dari yang paling banyak uangnya
            .limit(10);
        
        res.json(topUsers);
    } catch (err) {
        console.error("Error pas ambil data:", err);
        res.status(500).json({ message: "Gagal mengambil data dari database" });
    }
});

// --- 4. JALANKAN SERVER ---
// Di Render, port biasanya otomatis, tapi kita pakai 3000 sebagai cadangan
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server jalan di: http://localhost:${PORT}`);
    console.log(`📍 Endpoint kamu: http://localhost:${PORT}/api/leaderboard`);
});