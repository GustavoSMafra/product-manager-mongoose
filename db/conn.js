const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function main() {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log('Database connected');
}

main().catch((err) => console.log(`Database connection error: ${err}`));

module.exports = mongoose;