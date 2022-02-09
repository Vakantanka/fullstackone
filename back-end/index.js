const express = require('express')
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

let serieses = [];
let id = 0;

app.get('/', (_, res) => {
	res.set('Content-Type', 'text/html');
	res.send(Buffer.from("<h1>Hello World! It's Codecool</h1>"));
})

app.get('/api/serieses', (_, res) => {
	res.json(serieses);
})

app.post('/api/serieses', (req, res) => {
    const series = {
        id: id++,
        name: req.body.name,
        characters: req.body.charList
    }
    serieses.push(series);
	res.sendStatus(204);
})

app.delete('/api/serieses/:id', (req, res) => {
    const id = Number(req.params.id);
    // const newSerieses = [];
    // for (const s of serieses) {
    //     if (s.id !== id) {
    //         newSerieses.push(s);
    //     }
    // }
    // serieses = newSerieses;
    serieses = serieses.filter(s => s.id !== id);
    res.sendStatus(204);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})