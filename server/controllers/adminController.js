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

    async get_users(req, res, next) {
        try {
            let pool = await sql.connect(sqlConfig)
            const users = await pool.request()
                .query('SELECT login, role FROM users')
            return res.json(users.recordset)
        } catch (e) {
            return res.json(e.message);
        }
    }

    async delete_user(req, res, next) {
        try {
            const { login } = req.body
            let pool = await sql.connect(sqlConfig)
            await pool.request()
                .input('login', sql.VarChar, login)
                .query('DELETE FROM users WHERE login = @login')

            return res.json({message: "Пользователь удален!"})
        } catch (e) {
            return res.json(e.message);
        }
    }
}

module.exports = new AdminController()