const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const hamsters = require('./routes/hamsters');
const matches = require('./routes/matches.js');
// const matchWinners = require('./routes/matchWinners.js');
// const winners = require('./routes/winners.js');
// const losers = require('./routes/losers.js');


const PORT = process.env.PORT || 1337;
const buildFolder = path.join(__dirname, '../build');
const imgFolder = path.join(__dirname, '../build/img');

//Middleware
app.use( (req, res, next) => {
	console.log(`${req.method} ${req.url}`, req.params);
	next();
});

app.use(cors());
app.use(express.json());

app.use(express.static(buildFolder));
app.use(express.static(imgFolder));


//Routes

// app.get('/', (req, res) => {
// 	res.send('Hello from server')
// });

// app.get('/api/hamsters', (req, res) => {
// 	res.send();
// })

app.use('/api/hamsters', hamsters);

app.use('/api/assets', express.static(__dirname + '/../public/img'));

app.use('/api/matches', matches);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../build/index.html'))
});


//REST API 

// app.use('/hamsters', hamsters);
// app.use('/matches', matches);
// app.use('/matchWinners', matchWinners);
// app.use('/winners', winners);
// app.use('/losers', losers);

// Start server

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`);
})