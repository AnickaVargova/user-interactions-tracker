import express from 'express';
import path from 'path';
import { Server } from 'http';
import cors from 'cors';
import { URL } from 'url';

const app = express();
app.use(express.static('public'));

// website urls can be added here
const whitelist = ['http://localhost:4001'];
const corsOptions = { origin:  whitelist };

const __dirname = new URL('.', import.meta.url).pathname;
app.use(cors(corsOptions));
app.set('views', path.join(__dirname, 'demoSites'));
app.set('view engine', 'ejs');
app.use(express.json());
export const server = Server(app);

const output = express();
export const outputServer = Server(output);

const corsOutputOptions = {
  origin: 'http://localhost:4002/',
}
output.use(cors(corsOutputOptions));
output.set('views', path.join(__dirname, 'outputSites'));
output.set('view engine', 'ejs');
output.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

const requests = [];

app.post('/', (req, res) => {
  console.log(req.body);
  requests.push(req.body);
  res.send();
});

output.get('/', (req, res) => {
  res.render('output', { requests });
});

app.get('/about', (req, res) => {
  res.render('about');
});

server.listen(4001, () => console.log('Example app listening on port 4001!'));
outputServer.listen(4002, () => console.log('Output listening on port 4002!'))
