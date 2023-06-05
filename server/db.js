const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    // порт для рабочего компа 1:
    // port: 59909,
    // порт для рабочего компа 2:
    port: 64599,
    // порт для рабочего сервера:
    // port: 49166,
    // порт для райзен компа
    // port: 50027,
    options: {
        // для рабочего компа
        encrypt:false

        // trustServerCertificate: true,
        // cryptoCredentialsDetails: {
        //     minVersion: 'TLSv1'
        // }
    }
};

module.exports = sqlConfig