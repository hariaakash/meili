/* eslint-disable no-await-in-loop */
const Meili = require('./meili');

const raw = require('../static/raw.json');

const indexName = 'products';

const indexer = async () => {
	try {
		// Check for index and if not create it
		const indexes = await Meili.listIndexes();
		if (!indexes.map((x) => x.uid).includes(indexName)) await Meili.createIndex(indexName, { primaryKey: 'uid' });

		const index = await Meili.getIndex(indexName);

		// Format and filter data
		const docs = raw
			.filter((x) => (x['BRAND NAME'] && x['DRUG NAME'] && x.FORM_OF_DOSAGE))
			.map((x, i) => ({
				uid: i,
				brand: x['BRAND NAME'],
				drug: x['DRUG NAME'],
				form: x.FORM_OF_DOSAGE,
			}));

		// Add Documents
		const { updateId } = await index.addDocuments(docs);

		// Wait for Meili to finish indexing
		let waitForIndex = true;
		while (waitForIndex) {
			const res = await index.getUpdateStatus(updateId);
			if (res.status === 'processed') {
				waitForIndex = false;
				console.log(res);
			} else {
				console.log('Yet to index');
				await new Promise((r) => setTimeout(r, 2000));
			}
		}
	} catch (err) {
		console.log(err);
	}
};

module.exports = indexer;
