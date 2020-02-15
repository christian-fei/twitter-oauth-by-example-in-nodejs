# twitter-oauth-by-example-in-nodejs

Create an app on [developer.twitter.com](https://developer.twitter.com/en/apps) and get the following key and tokens:

- `TWITTER_ACCESS_KEY`
- `TWITTER_ACCESS_TOKEN_SECRET`
- `TWITTER_CONSUMER_KEY`
- `TWITTER_CONSUMER_SECRET`

and run in your cloned local repository (to clone the repo: `git clone git@github.com:christian-fei/twitter-oauth-by-example-in-nodejs.git`):

```

TWITTER_ACCESS_KEY=[YOUR_TWITTER_ACCESS_KEY] TWITTER_ACCESS_TOKEN_SECRET=[YOUR_TWITTER_ACCESS_TOKEN_SECRET] TWITTER_CONSUMER_KEY=[YOUR_TWITTER_CONSUMER_KEY] TWITTER_CONSUMER_SECRET=[YOUR_TWITTER_CONSUMER_SECRET] npm start

```

this will log something like:

```

> twitter-oauth-by-example-in-nodejs@1.0.0 start /Users/christian/Documents/projects/twitter-oauth-by-example-in-nodejs
> node $npm_package_main

oauth1 response {"id":2244994945,"id_str":"2244994945","name":"Twitter Dev","screen_name":"TwitterDev","location":"1...
oauth2 response {"id":2244994945,"id_str":"2244994945","name":"Twitter Dev","screen_name":"TwitterDev","location":"1...

```

[check out the source code](https://github.com/christian-fei/twitter-oauth-by-example-in-nodejs/blob/3cc955672d598ce1f25591b23b892b19cfde5b2a/index.js) and [step by step explanation on christianfei.com](https://christianfei.com/posts/2020-02-15-Twitter-OAuth-by-example-in-Nodejs/)


## sidenote: OAuth2 with `curl`

Getting an **access token** that can be used to authenticate via `Bearer` authentication can be easily achieved with `curl`:

```bash
curl -u '<YOUR_TWITTER_CONSUMER_KEY>:<YOUR_TWITTER_CONSUMER_SECRET>' --data 'grant_type=client_credentials' 'https://api.twitter.com/oauth2/token'
```

and the response will look something like this:

```bash
{"token_type":"bearer","access_token":"AAAAAAAAA..."}
```

Now we can authenticate with the `access_token` to the twitter api, using `Bearer` authorization scheme:

```bash
curl --header 'Authorization: Bearer AAAAAAAAA...' 'https://api.twitter.com/1.1/users/show.json?screen_name=christian_fei'
```

returning more information about the twitter user profile `christian_fei`:

```json
{"id":128166532,"id_str":"128166532","name":"\/christian\/\ud83c\udf55","screen_name":"christian_fei","location":"The Internet","profile_location":null,"description":"agile person, clean code connoisseur and testing aficionado \ud83d\udc68\u200d\ud83d\udcbb dev @wonderflow","url":"https:\/\/t.co\/qUleUCEuNH","entities":{"url":{"urls":[{"url":"https:\/\/t.co\/qUleUCEuNH","expanded_url":"https:\/\/christianfei.com\/","display_url":"christianfei.com","indices":[0,23]}]},"description":{"urls":[]}},"protected":false,"followers_count":567,"friends_count":133,"listed_count":111,"created_at":"Wed Mar 31 08:55:25 +0000 2010","favourites_count":4078,"utc_offset":null,"time_zone":null,"geo_enabled":true,"verified":false,"statuses_count":12795 ...
```