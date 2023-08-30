import express from "express";

import configExpress from "./config/express";
import routes from "./routes";

const app = express();
const port = process.env.PORT || 8080;

configExpress(app);

routes(app);

app.all('/', (_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
