import express from "express";

import configExpress from "./config/express";
import routes from "./routes";

const app = express();
const port = process.env.PORT || 8080;

// app.use((req, _, next) => {
//     console.log('REQUEST HEADERS BEFORE EVERYTHING', req.headers)
//     next()
// })

app.use(function (req, res, next) {
    const allowedOrigins = ['https://nft-marketplace-frontend-afh57hu61-tatianaing96.vercel.app/edit-profile-image'];
    const origin = req.headers.origin;
    if (!origin) {
        return res.json({ message: 'No origin header found' });
    }
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

configExpress(app);

// app.use((req, _, next) => {
//     console.log('REQUEST HEADERS BEFORE ROUTES', req.headers)
//     next()
// })

routes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
