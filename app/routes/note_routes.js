// routes/node_routes.js

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db)
{
	app.get('/echo', (req, res) => {
		res.send("Echo test server");
	});

	app.trace('/notes', (req, res) => {
		res.send("Request trace result");
	})

	app.put('/notes/:id', (req, res) => 
	{
		const id = req.params.id;
		const details = { '_id' : new ObjectID(id) };
		var updatedBody = req.body.body;
		var updatedTitle = req.body.title;
		console.log('Got PUT request for id : ' + id);
		console.log('Got PUT request body: ' + JSON.stringify(req.body));
		/*
		var note;
		if ( updatedBody != null && updateTitle != null)
		{
			note = { text : req.body.body, title : req.body.title };
		}
		else if( updatedBody != null)
		{
			note = { text : req.body.body};

		}
		else if ( updatedTitle != null)
		{
			note = {title : req.body.title };
		}
		else
		{
			return res.send('Nothing to update');
		}
		*/

		const note = { text: req.body.body, title: req.body.title };

		db.collection('notes').update(details, note, (err, item) =>
		{
			if (err)
			{
				res.send( { 'Error' : 'Encountered an error while updating record id :' + id});
			}
			else
			{
				console.log("Got text: " + note.text + ", title: " + note.title);
				console.log("Updated item: " + item);
				res.send(note);
			}
		});

	});


	app.delete('/notes/:id', (req, res) =>
	{
		const id = req.params.id;
		const details = { '_id' : new ObjectID(id)};

		db.collection('notes').remove(details, (err, item) =>
		{
			if (err)
			{
				res.send({'error' : 'An error occured attempting to delete note id : ' + id});
			}
			else
			{
				res.send('Successfully deleted. item: ' + item);
			}
		});

	});


	app.get('/notes/:id', (req, res) =>
	{
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };

		console.log('Got GET request for id : ' + id);
		console.log('Rest of req: ' + req.params);
		db.collection('notes').findOne(details, (err, item) =>
		{
			if (err)
			{
				res.send({'error': 'An error occured on retrieval'});
			}
			else
			{
				res.send(item);
			}
		});
	});

	app.post('/notes', (req, res) => 
	{
		console.log(req.body);
		const note = { text: req.body.body, title: req.body.title};
		console.log('Got POST request for body : ' + req.body);
		db.collection('notes').insert(note, (err, result) => 
		{
			if (err)
			{
				res.send({ 'error' : 'An error occured'});
			}
			else
			{
				res.send(result.ops[0]);
			}
		});
		//res.send('hello there');

	});
    
};
