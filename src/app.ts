import express from "express";

import configExpress from "./config/express";
import routes from "./routes";

const app = express()
const port = 8080

configExpress(app)

routes(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

