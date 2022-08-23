import express from 'express';

const app = express();

app.get('./', () => {
	console.log('Work');
});

app.listen(8000, () => {
	console.log('listening port: 8000');
});
