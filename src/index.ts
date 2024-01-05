import os from 'node:os';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import formData from 'express-form-data';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import router from './router';

require('dotenv').config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors({
  credentials: true,
  origin: true,
}));

const formDataParserOptions = {
  uploadDir: os.tmpdir(),
  autoClean: true
};


app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(formData.parse(formDataParserOptions));
app.use(formData.union());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080/")
});

app.use('/', router());