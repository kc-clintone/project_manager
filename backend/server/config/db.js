const mongoose = require('mongoose');

const dbConnection = async () => {
	const conn = await mongoose.connect(
		process.env.MONGODB_URI
		// 'mongodb://localhost:27017/project_manager'
	);

	console.log(
		`connection established : ${conn.connection.host}`.cyan.underline.bold
	);
};

module.exports = dbConnection;
