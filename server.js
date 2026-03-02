const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// LINK LANGSUNG (Whitelist IP 0.0.0.0/0 di Atlas dulu!)
const MONGO_URI = "mongodb+srv://ZhilvaniAzzuar:asd123@database.vjebium.mongodb.net/database?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ KONEKSI MONGODB BERHASIL'))
  .catch(err => console.error('❌ ERROR KONEKSI:', err));

const userSchema = new mongoose.Schema({
    username: String,
    ct_wallet: { type: Number, default: 0 },
    ct_bank: { type: Number, default: 0 }
});

// GANTI 'users' DI BAWAH INI SESUAI NAMA COLLECTION DI ATLAS KAMU
const User = mongoose.model('User', userSchema, 'users');

app.get('/api/leaderboard', async (req, res) => {
    try {
        const topUsers = await User.find().sort({ ct_wallet: -1 }).limit(10);
        console.log("Data ditemukan:", topUsers.length);
        res.json(topUsers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ON di port ${PORT}`));