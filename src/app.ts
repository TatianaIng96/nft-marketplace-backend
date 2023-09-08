import express from "express";

import configExpress from "./config/express";
import routes from "./routes";

const app = express();
const port = process.env.PORT || 8080;

// app.use((req, _, next) => {
//     console.log('REQUEST HEADERS BEFORE EVERYTHING', req.headers)
//     next()
// })

app.use((_, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "*"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Private-Network", "true");
    res.setHeader("Access-Control-Max-Age", 7200);

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
