import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

const allowedOrigins = ['*'];

const options = {
    origin: allowedOrigins,
}

const configExpress = (app: Application) => {
    app.use(cors(options));
    app.use(morgan('dev'));
    app.use(express.json());
}

export default configExpress;