// const mongoConnect = require('./helpers/mongodb');

const indexData = require('./helpers/indexData');

const Meili = require('./helpers/meili');

(async () => {
	// await mongoConnect();
	await indexData();

	const index = await Meili.getIndex('products');

	console.log(await index.search('ethinyl'));
	console.log(await index.search('ethinyl tablet'));

	console.log('UI http://localhost:7700');
})();
