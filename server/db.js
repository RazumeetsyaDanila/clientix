const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    // порт для рабочего компа:
    // port: 49951,
    // порт для рабочего сервера:
    // port: 49166,
    options: {
        trustServerCertificate: true,
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        }
    }
};

module.exports = sqlConfig