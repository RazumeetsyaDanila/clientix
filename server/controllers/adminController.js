const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sqlConfig = require('../db');
const sql = require('mssql')

const generateJwt = (user_id, login, role) => {
    return jwt.sign(
        { user_id, login, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class AdminController {

    async registration(req, res, next) {
        try {
            const { login, password, role } = req.body

            if (!login || !password) return next(ApiError.badRequest('Некорректный login или password'))

            let pool = await sql.connect(sqlConfig)
            let candidate = await pool.request()
                .input('login', sql.VarChar, login)
                .query('SELECT * FROM users WHERE login = @login')
            if(candidate.recordset.length > 0) return res.json({ message: "Пользователь с таким логином уже существует!" })

            const hashPassword = await bcrypt.hash(password, 5)

            await pool.request()
                .input('login', sql.VarChar, login)
                .input('password', sql.VarChar, hashPassword)
                .input('role', sql.VarChar, role)
                .query('INSERT INTO users (login, password, role) values(@login, @password, @role)')

            const token = generateJwt(login, role)
            return res.json({token})        
        } catch (e) {
            return res.json(e.message);
        }
    }

    async delete_user(req, res, next) {
        try {

        } catch (e) {
            return res.json(e.message);
        }
    }

    async delete_org(req, res, next) {
        try {

        } catch (e) {
            return res.json(e.message);
        }
    }
}

module.exports = new AdminController()







// первые попытки делать асинхронные запросы
       // try {
        //     const { login, password, role } = req.body

        //     if (!login || !password) {
        //         return next(ApiError.badRequest('Некорректный login или password'))
        //     }
        //     let candidate
        //     let connection1 = await new sql.connect(sqlConfig, function(err) {
        //         let sqlRequest = new sql.Request(connection1);
        //         sqlRequest.input('login', sql.VarChar, login);

        //         sqlRequest.query("SELECT * FROM users WHERE login = @login", function(err, result) {
        //             // if(result.recordsets.length != 0) return res.json({ message: "Пользователь с таким логином уже существует!" })
        //             if(result.recordsets.length != 0){
        //                 // console.log(result.recordset)
        //                 // console.log(result.recordset.length)
        //                 candidate = result.recordset.length
        //                 console.log(candidate)
        //                 console.log('1')
        //                 // if(candidate) return res.json({ message: "Пользователь с таким логином уже существует!" })
        //             }
        //         });
        //         console.log('2')
        //         // console.log(candidate)
        //         if(candidate) return res.json({ message: "Пользователь с таким логином уже существует!" })
        //     });

        //     // const candidate = await db.query("SELECT * FROM users WHERE login = $1", [login])

        //     let connection = await new sql.connect(sqlConfig, function(err) {
        //         let sqlRequest = new sql.Request(connection);
        //         sqlRequest.input('login', sql.VarChar, login);
        //         sqlRequest.input('password', sql.VarChar, password);
        //         sqlRequest.input('role', sql.VarChar, role);
        //         // sqlRequest.multiple = true;
        //         let candidate

        //         sqlRequest.query("SELECT * FROM users WHERE login = @login", function(err, result) {
        //             // if(result.recordsets.length != 0) return res.json({ message: "Пользователь с таким логином уже существует!" })
        //             if(result.recordsets.length != 0){
        //                 // console.log(result.recordset)
        //                 // console.log(result.recordset.length)
        //                 candidate = result.recordset.length
        //                 // console.log(candidate)
        //                 console.log('3')

        //             }
        //         });
        //         console.log('4')
        //         if(candidate){
        //             return res.json({ message: "Пользователь с таким логином уже существует!" })
        //         }
        //         // sqlRequest.query("SELECT * FROM users WHERE login = 'testLogin'", function(err, result) {
        //         //     // if(result.recordsets.length != 0) return res.json({ message: "Пользователь с таким логином уже существует!" })
        //         //     console.log(result.recordset)
        //         //     connection.close();
        //         //     return res.json({ message: "Пользователь получен!" })
        //         // });

        //         sqlRequest.query("INSERT INTO users (login, password, role) values(@login, @password, @role)", function(err, recordsets) {          
        //             // connection.close();
        //         });

        //         return res.json({ message: "Пользователь  добавлен!" })
        //     });

        // } catch (e) {
        //     return res.json(e.message);
        // }