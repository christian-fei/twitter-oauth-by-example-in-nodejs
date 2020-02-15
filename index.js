#!/usr/bin/env node

const OAuth = require('oauth')
const got = require('got')
const { promisify } = require('util')

if (require.main === module) {
  getTwitterUserProfileWithOAuth1('twitterdev')
    .then((profile) => console.log('oauth1 response', JSON.stringify(profile).substring(0, 100) + '...') && process.exit(0))
    .catch(err => console.error(err) && process.exit(1))

  getTwitterUserProfileWithOAuth2('twitterdev')
    .then((profile) => console.log('oauth2 response', JSON.stringify(profile).substring(0, 100) + '...') && process.exit(0))
    .catch(err => console.error(err) && process.exit(1))
} else {
  module.exports = {
    getTwitterUserProfileWithOAuth1,
    getTwitterUserProfileWithOAuth2
  }
}

async function getTwitterUserProfileWithOAuth1 (username = 'twitterdev') {
  var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    '1.0A', null, 'HMAC-SHA1'
  )
  const get = promisify(oauth.get.bind(oauth))

  const body = await get(
    `https://api.twitter.com/1.1/users/show.json?screen_name=${username}`,
    process.env.TWITTER_ACCESS_KEY,
    process.env.TWITTER_ACCESS_TOKEN_SECRET
  )

  return JSON.parse(body)
}

async function getTwitterUserProfileWithOAuth2 (username = 'twitterdev') {
  var oauth2 = new OAuth.OAuth2(
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    'https://api.twitter.com/', null, 'oauth2/token', null
  )
  const getOAuthAccessToken = promisify(oauth2.getOAuthAccessToken.bind(oauth2))
  const accessToken = await getOAuthAccessToken('', { grant_type: 'client_credentials' })

  return got(`https://api.twitter.com/1.1/users/show.json?screen_name=${username}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }, { json: true })
    .then((res) => JSON.parse(res.body))
}
