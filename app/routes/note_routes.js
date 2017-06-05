// routes/node_routes.js

module.exports = function(app, db)
{
	app.get('/notes', (req, res) =>
	{
		res.send('Test get successfull');

	});

	app.post('/notes', (req, res) => 
	{
		console.log(req.body);
		res.send('hello there');

	});
    
};
