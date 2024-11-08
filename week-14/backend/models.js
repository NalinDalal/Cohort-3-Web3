require('dotenv').config();

const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
if (!uri) {
	throw new Error('MONGODB_URI is not defined');
}
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.error('MongoDB connection error:', err));
const UserSchema = mongoose.Schema({
	username: String,
	password: String,
	privateKey: String,
	publicKey: String
})

const userModel = mongoose.model("users", UserSchema);

module.exports = {
	userModel
}
