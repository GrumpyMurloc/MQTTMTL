require('dotenv').config(); // instatiate environment variables

const CONFIG = {}; // Make this global to use all over application
//3306
CONFIG.port = process.env.PORT || '5000';

CONFIG.db_connectionLimit = process.env.DB_LIMIT || '100';
CONFIG.db_dialect = process.env.DB_DIALECT || 'mysql';
CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_port = process.env.DB_PORT || '3306';
CONFIG.db_name = process.env.DB_NAME || 'log430';
CONFIG.db_user = process.env.DB_USER || 'root';
CONFIG.db_password = process.env.DB_PASSWORD || 'root';

CONFIG.db_data_tableName = process.env.DB_DATA_TABLE_NAME || 'aggregated_data'
CONFIG.db_error_tableName = process.env.DB_ERROR_TABLE_NAME || 'error_history'

module.exports = CONFIG;
