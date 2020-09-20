const MeiliSearch = require('meilisearch');

const host = process.env.MEILI_HOST || 'localhost:27017';
const apiKey = process.env.MEILI_API_KEY || '';

const client = new MeiliSearch({
	host,
	apiKey,
});

module.exports = client;
