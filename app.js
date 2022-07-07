import express from "express";
import { connectToMongoDB } from "./src/services/moongose-run";
import playerRoutes from "./src/routes/player.route";
import seedRoutes from "./src/routes/seed.route";
import creditRoutes from "./src/routes/credit.route";
import wheelRoutes from "./src/routes/wheel.route";
import prizesRoutes from "./src/routes/prizes.route";
import bodyParser from "body-parser";

import "dotenv/config";

var app = express();

var port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: true }),bodyParser.json(), playerRoutes, seedRoutes, creditRoutes, wheelRoutes, prizesRoutes);
app.use(express.static('./src/public'));

app.listen(port, () => {
  connectToMongoDB()
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log(err));
  console.log(`Server started at port ${port}`);
});
