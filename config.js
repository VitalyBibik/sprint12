require('dotenv').config();

module.exports.PORT = process.env.PORT || 3000;
module.exports.DATABASE_URL = 'mongodb://localhost:27017/mestodb';
module.exports.NODE_ENV = process.env;
module.exports.JWT_SECRET = process.env;
