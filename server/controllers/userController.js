const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');
const sqlConfig = require('../db');
const sql = require('mssql');
const bcrypt = require('bcrypt');

const generateJwt = (user_id, login, role) => {
    return jwt.sign(
        {user_id, login, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {

    async login(req, res, next) {
        try {
            const { login, password } = req.body
            let pool = await sql.connect(sqlConfig)
            let candidate = await pool.request()
                .input('login', sql.VarChar, login)
                .query('SELECT * FROM users WHERE login = @login')

            if (candidate.recordset.length == 0) return next(ApiError.internal('Пользователь не найден'))

            let comparePassword = bcrypt.compareSync(password, candidate.recordset[0].password)
            if (!comparePassword) return next(ApiError.internal('Указан неверный пароль'))

            const token = generateJwt(candidate.recordset[0].login, candidate.recordset[0].role)
            return res.json({ token })
        } catch (e) {
            return res.json(e.message);
        }
    }

    async get_orgs(req, res, next) {
        try {

        } catch (e) {
            return res.json(e.message);
        }
    }

    async add_org(req, res, next) {
        try {

        } catch (e) {
            return res.json(e.message);
        }
    }

    async update_org(req, res, next) {
        try {

        } catch (e) {
            return res.json(e.message);
        }
    }
}

module.exports = new UserController()








//-----------------------------------------------------------------------------------------------------------------------------------
            // const login = "test2"
            // const password = "test2"
            // const role = "test2"

            // await sql.connect(config)

            // sql.input('login', sql.VarChar, login);
            // sql.input('password', sql.VarChar, password);
            // sql.input('role', sql.VarChar, role);
            // await sql.query(`select * from users where login = ${322}`)
            // const user = await sql.query(`INSERT INTO users (login, password, role) values(${login}, ${password}, ${role})`)
            // const user = await sql.query(`INSERT INTO users (login, password, role) values(@login, @password, @role)`)
            // const user = await sql.query("INSERT INTO users (login, password, role) values("+login+","+ password+","+role+")")
            // const user = await sql.query("INSERT INTO users (login, password, role) values{$1, $2, $3}", [login, password, role])

            // return res.json({ message: "Пользователь  добавлен!" })



            // sql.connect(config)
            // let sqlRequest = new sql.Request(config);
            // sqlRequest.input('login', sql.VarChar, login);
            // sqlRequest.input('password', sql.VarChar, password);
            // sqlRequest.input('role', sql.VarChar, role);
            // sqlRequest.query("INSERT INTO users (login, password, role) values(@login, @password, @role)")
            // return res.json({ message: "Пользователь  добавлен!" })