const mongoose = require('mongoose');

const dbConnection = async () => {
	const conn = await mongoose.connect(process.env.MONGODB_URI);

	console.log(
		`connection successful : ${conn.connection.host}`.cyan.underline.bold
	);
};

module.exports = dbConnection;
