// imports
const colors = require('colors');
const cors = require('cors');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
require('dotenv').config();
const dbConnection = require('./config/db');

// build
const port = process.env.PORT || 5000;

const app = express();
// connect to db
dbConnection();

app.use(cors());

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: process.env.NODE_ENV === 'development',
	})
);
app.listen(
	port,
	console.log(`server running on port: http://localhost:${port}`)
);
