const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');
const sqlConfig = require('../db');
const sql = require('mssql');
const bcrypt = require('bcrypt');

const generateJwt = (login, role) => {
    return jwt.sign(
        { login, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
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

    async auth(req, res) {
        const token = generateJwt(req.user.login, req.user.role)
        return res.json({ token })
    }

    async get_orgs(req, res, next) {
        try {
            let pool = await sql.connect(sqlConfig)
            let organizations = await pool.request()
                .query('SELECT org_id, org_name,simed_admin_pass ,remote_access, comment, city FROM organizations')

            if (organizations.recordset.length == 0) return next(ApiError.internal('Ни одной организации не найдено'))

            return res.json(organizations.recordset)
        } catch (e) {
            return res.json(e.message);
        }
    }

    async add_org(req, res, next) {
        try {
            const { org_name, simed_admin_pass, remote_access, city, comment } = req.body
            let pool = await sql.connect(sqlConfig)

            let search_org = await pool.request()
                .input('org_name', sql.VarChar, org_name)
                .query('SELECT * FROM organizations WHERE org_name = @org_name')
            if (search_org.recordset.length > 0) return res.json({ message: "Организация с таким именем уже существует!" })

            await pool.request()
                .input('org_name', sql.VarChar, org_name)
                .input('simed_admin_pass', sql.VarChar, simed_admin_pass)
                .input('remote_access', sql.VarChar, remote_access)
                .input('city', sql.VarChar, city)
                .input('comment', sql.VarChar, comment)
                .query('INSERT INTO organizations (org_name, simed_admin_pass, remote_access, city, comment)' +
                    'VALUES (@org_name, @simed_admin_pass, @remote_access, @city, @comment)')
            return res.json({ message: "Организация добавлена!" })
        } catch (e) {
            return res.json(e.message);
        }
    }

    async update_org(req, res, next) {
        try {
            const { org_id, org_name, sql_name, sa_password, mongo_db, simed_admin_pass, egisz, smsc_login, smsc_pass, dadata, remote_access, city, backup, comment } = req.body
            let pool = await sql.connect(sqlConfig)
            await pool.request()
                .input('org_id', sql.Int, org_id)
                .input('org_name', sql.VarChar, org_name)
                .input('simed_admin_pass', sql.VarChar, simed_admin_pass)
                .input('remote_access', sql.VarChar, remote_access)
                .input('city', sql.VarChar, city)
                .input('comment', sql.VarChar, comment)
                .query('UPDATE organizations SET org_name = @org_name, ' +
                    'comment = @comment, city = @city, remote_access = @remote_access, ' +
                    'simed_admin_pass = @simed_admin_pass, ' +
                    'WHERE org_id = @org_id')
            return res.json({ message: "Организация обновлена!" })
        } catch (e) {
            return res.json(e.message);
        }
    }

    async delete_org(req, res, next) {
        try {
            const { org_id } = req.body
            let pool = await sql.connect(sqlConfig)
            await pool.request()
                .input('org_id', sql.Int, org_id)
                .query('DELETE FROM organizations WHERE org_id = @org_id')
            return res.json({ message: "Организация удалена!" })
        } catch (e) {
            return res.json(e.message);
        }
    }
    // работа с тегами
    async get_tags(req, res, next) {
        try {
            let pool = await sql.connect(sqlConfig)
            let tags = await pool.request()
                .query('SELECT * FROM tags')

            if (tags.recordset.length == 0) return next(ApiError.internal('Ни одного тега не найдено!'))

            return res.json(tags.recordset)
        } catch (e) {
            return res.json(e.message);
        }
    }

    async get_tags_groups(req, res, next) {
        try {
            let pool = await sql.connect(sqlConfig)
            let tags_groups = await pool.request()
                .query('SELECT * FROM tags_groups')

            if (tags_groups.recordset.length == 0) return next(ApiError.internal('Ни одной группы тегов не найдено!'))

            return res.json(tags_groups.recordset)
        } catch (e) {
            return res.json(e.message);
        }
    }
}

module.exports = new UserController()