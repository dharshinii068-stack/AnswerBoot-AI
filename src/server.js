const path = require("path");
const dotenv = require("dotenv");

const envPath = path.join(__dirname, "../.env");
const result = dotenv.config({ path: envPath });

console.log("ENV FILE:", envPath);
console.log("ENV ERROR:", result.error);
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = require("./app");
const connectDB = require("./database");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});