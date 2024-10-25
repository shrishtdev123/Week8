const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const Mainrouter = require("../backend/src/route/index");
app.use("/api/v1", Mainrouter); // Add the leading slash
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
