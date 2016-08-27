const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/settings', (req, res) => {
	
});

app.listen(3000, () => console.log('Listening on port 3000...'));