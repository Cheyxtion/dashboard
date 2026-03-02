const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors()); // Biar website bisa akses API
app.use(express.json());

const cors = require('cors');
app.use(cors()); // Ini wajib ada di paling atas setelah 'app' didefinisikan

// 1. Konek ke MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Koneksi Mongo Berhasil!'))
  .catch(err => console.error(err));

// 2. Definisi Schema (Sesuaikan dengan isi database Bot kamu)
const userSchema = new mongoose.Schema({
    username: String,
    ct_wallet: Number,
    ct_bank: Number
});
const User = mongoose.model('User', userSchema, 'users'); // 'users' adalah nama collection kamu

// 3. Endpoint Leaderboard
app.get('/api/leaderboard', async (req, res) => {
    try {
        // Ambil top 10, urutkan berdasarkan uang terbanyak
        const topUsers = await User.find()
            .sort({ ct_wallet: -1 }) 
            .limit(10);
        
        res.json(topUsers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(3000, () => console.log('API jalan di port 3000'));