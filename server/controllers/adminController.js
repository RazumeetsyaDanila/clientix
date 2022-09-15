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

    // работа с тегами

    async add_tags_group(req, res, next) {
        try {
            const { group_name } = req.body
            let pool = await sql.connect(sqlConfig)

            let search_group_name = await pool.request()
                .input('group_name', sql.VarChar, group_name)
                .query('SELECT * FROM tags_groups WHERE group_name = @group_name')
            if (search_group_name.recordset.length > 0) return res.json({ message: "Такая группа уже существует!" })

            await pool.request()
                .input('group_name', sql.VarChar, group_name)
                
                .query('INSERT INTO tags_groups (group_name)' +
                    'VALUES (@group_name)')
            return res.json({ message: "Группа добавлена!" })
        } catch (e) {
            return res.json(e.message);
        }
    }

    async add_tag(req, res, next) {
        try {
            const { tag_name, group_id, tag_value1, tag_value2, tag_value3 } = req.body
            let pool = await sql.connect(sqlConfig)

            let search_tag = await pool.request()
                .input('tag_name', sql.VarChar, tag_name)
                .query('SELECT * FROM tags WHERE tag_name = @tag_name')
            if (search_tag.recordset.length > 0) return res.json({ message: "Тег с таким названием уже существует!" })

            await pool.request()
                .input('tag_name', sql.VarChar, tag_name)
                .input('group_id', sql.VarChar, group_id)
                .input('tag_value1', sql.VarChar, tag_value1)
                .input('tag_value2', sql.VarChar, tag_value2)
                .input('tag_value3', sql.VarChar, tag_value3)
                
                .query('INSERT INTO tags (tag_name, group_id, tag_value1, tag_value2, tag_value3)' +
                    'VALUES (@tag_name, @group_id, @tag_value1, @tag_value2, @tag_value3)')
            return res.json({ message: "Тег добавлен!" })
        } catch (e) {
            return res.json(e.message);
        }
    }

    async delete_tag(req, res, next) {
        try {
            const { tag_name } = req.body
            let pool = await sql.connect(sqlConfig)
            await pool.request()
                .input('tag_name', sql.VarChar, tag_name)
                .query('DELETE FROM tags WHERE tag_name = @tag_name')
            return res.json({ message: "Тег удален!" })
        } catch (e) {
            return res.json(e.message);
        }
    }
}

module.exports = new AdminController()