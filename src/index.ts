import './config/env';
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import routes from './routes';
import * as bodyParser from 'body-parser';

const app = express();

createConnection();

app.use(bodyParser.json());
app.use(routes);
app.use(express.json());
app.listen(3333);
