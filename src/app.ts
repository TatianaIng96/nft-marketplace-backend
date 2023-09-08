import express from "express";

import configExpress from "./config/express";
import routes from "./routes";

const app = express();
const port = process.env.PORT || 8080;

app.use((req, _, next) => {
    console.log(req.headers)
})

configExpress(app);

// app.use((_, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'https://nft-marketplace-frontend-9z7xtntur-tatianaing96.vercel.app/*');
//     next();
// });

routes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
