const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const deployRoutes = require("./routes/deploy.js");


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", deployRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});