const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors()); // Supaya HTML bisa akses API ini

// URL MongoDB Atlas kamu
const mongoURI = "mongodb+srv://ZhilvaniAzzuar:asd123@database.vjebium.mongodb.net/database?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
    .then(() => console.log("Database Connected!"))
    .catch(err => console.log(err));

// Schema sesuai gambar struktur data kamu
const userSchema = new mongoose.Schema({
    _id: String,
    name: String,
    cash: Number,
    bank: Number
}, { collection: 'users' }); // Pastikan nama collection-nya benar

const User = mongoose.model('User', userSchema);

app.get('/leaderboard', async (req, res) => {
    try {
        // Mengambil data dan menjumlahkan cash + bank
        const data = await User.aggregate([
            {
                $project: {
                    name: 1,
                    _id: 1,
                    totalCT: { $add: ["$cash", "$bank"] }
                }
            },
            { $sort: { totalCT: -1 } }, // Urutkan dari yang paling kaya
            { $limit: 5 } // Ambil Top 5 saja
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));