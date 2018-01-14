const authCred = require('../../config/twitterConfig');
var Twitter = require('twitter');

module.exports = function(app, db)
{
	let client = new Twitter({
				consumer_key : authCred.consumer_key,
				consumer_secret : authCred.consumer_secret,
				access_token_key : authCred.access_token_key,
				access_token_secret : authCred.access_token_secret
			});

	var params = {screen_name : 'nic_nash'};

	app.get('/v1/tweet/list', (req, res) => {

		if (authCred)
		{
			console.log("Found Twitter creds: " + authCred.consumer_key);
			var searchString = req.query.queryString;

			if (searchString)
			{
				searchString = {screen_name : searchString};
			}
			else
			{
				searchString = params;
			}

			client.get('statuses/user_timeline', searchString, function(error, tweets, response){
				if (!error)
				{
					console.log(tweets);
					//res.send(tweets);
					//var tweetContent = tweets.map((curval, index) => {return curval.text;});
					var tweetContent = tweets.map((curval, index) => {return {"date": curval.created_at, "text" : curval.text, "retweet_count" : curval.retweet_count, "favorite_count" : curval.favorite_count};});
					res.send(tweetContent);
				}
			});
		}
	});
}