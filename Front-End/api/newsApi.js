const http = require('https');

const options = {
	method: 'GET',
	hostname: 'nba-api-free-data.p.rapidapi.com',
	port: null,
	path: '/https://api-nba-v1.p.rapidapi.com/seasons/',
	headers: {
		'x-rapidapi-key': '309d991d30mshfbd53174ab60879p103881jsn4734e44fbc47',
		'x-rapidapi-host': 'nba-api-free-data.p.rapidapi.com'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});
console.log(req)

req.end();