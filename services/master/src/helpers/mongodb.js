const mongoose = require('mongoose');

const protocol = process.env.MONGODB_PROTOCOL || 'mongodb';
const host = process.env.MONGODB_HOST || 'localhost:27017';
const db = process.env.MONGODB_DB || 'test';
const options = process.env.MONGODB_OPTIONS ? `?${process.env.MONGODB_OPTIONS}` : '';

const user = process.env.MONGODB_USER;
const pass = process.env.MONGODB_PASS;
const auth = (user && pass) ? `${user}:${pass}@` : '';

const dbURI = `${protocol}://${auth}${host}/${db}${options}`;

const meta = { module: 'MONGO' };

const connect = () => mongoose.connect(dbURI, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

mongoose.connection.on('disconnected', (error) => {
	console.log('error', 'Disconnected', { ...meta, error });
});

mongoose.connection.on('connected', () => {
	console.log('info', 'Connected', meta);
});

module.exports = connect;
