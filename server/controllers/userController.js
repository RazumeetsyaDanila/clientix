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
                .query('SELECT * FROM organizations')

            if (organizations.recordset.length == 0) return next(ApiError.internal('Ни одной организации не найдено'))

            return res.json(organizations.recordset)
        } catch (e) {
            return res.json(e.message);
        }
    }

    async add_org(req, res, next) {
        try {
            const { org_name, anydesk, sql_name, rdp, sa_password, mongo_db, simed_admin_pass, egisz, smsc_login, smsc_pass, dadata } = req.body
            let pool = await sql.connect(sqlConfig)

            let search_org = await pool.request()
                .input('org_name', sql.VarChar, org_name)
                .query('SELECT * FROM organizations WHERE org_name = @org_name')
            if (search_org.recordset.length > 0) return res.json({ message: "Организация с таким именем уже существует!" })

            await pool.request()
                .input('org_name', sql.VarChar, org_name)
                .input('sql_name', sql.VarChar, sql_name)
                .input('sa_password', sql.VarChar, sa_password)
                .input('mongo_db', sql.VarChar, mongo_db)
                .input('simed_admin_pass', sql.VarChar, simed_admin_pass)
                .input('egisz', sql.VarChar, egisz)
                .input('smsc_login', sql.VarChar, smsc_login)
                .input('smsc_pass', sql.VarChar, smsc_pass)
                .input('dadata', sql.VarChar, dadata)
                .query('INSERT INTO organizations (org_name, sql_name, sa_password, mongo_db, simed_admin_pass, egisz, smsc_login, smsc_pass, dadata)' +
                    'VALUES (@org_name, @sql_name, @sa_password, @mongo_db, @simed_admin_pass, @egisz, @smsc_login, @smsc_pass, @dadata)')
            return res.json({ message: "Организация добавлена!" })
        } catch (e) {
            return res.json(e.message);
        }
    }

    async update_org(req, res, next) {
        try {
            const { org_id, org_name, anydesk, sql_name, rdp, sa_password, mongo_db, simed_admin_pass, egisz, smsc_login, smsc_pass, dadata } = req.body
            let pool = await sql.connect(sqlConfig)
            await pool.request()
                .input('org_id', sql.Int, org_id)
                .input('org_name', sql.VarChar, org_name)
                .input('anydesk', sql.VarChar, anydesk)
                .input('sql_name', sql.VarChar, sql_name)
                .input('rdp', sql.VarChar, rdp)
                .input('sa_password', sql.VarChar, sa_password)
                .input('mongo_db', sql.VarChar, mongo_db)
                .input('simed_admin_pass', sql.VarChar, simed_admin_pass)
                .input('egisz', sql.VarChar, egisz)
                .input('smsc_login', sql.VarChar, smsc_login)
                .input('smsc_pass', sql.VarChar, smsc_pass)
                .input('dadata', sql.VarChar, dadata)
                .query('UPDATE organizations SET org_name = @org_name, anydesk = @anydesk, sql_name = @sql_name, rdp = @rdp, sa_password = @sa_password,' +
                    'mongo_db = @mongo_db, simed_admin_pass = @simed_admin_pass, egisz = @egisz, smsc_login = @smsc_login, smsc_pass = @smsc_pass, dadata = @dadata ' +
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

    async add_tags_group(req, res, next) {
        try {
            const { group_name } = req.body
            let pool = await sql.connect(sqlConfig)

            let search_group_name = await pool.request()
                .input('group_name', sql.VarChar, group_name)
                .query('SELECT * FROM tags_group WHERE group_name = @group_name')
            if (search_group_name.recordset.length > 0) return res.json({ message: "Такая группа уже существует!" })

            await pool.request()
                .input('group_name', sql.VarChar, group_name)
                
                .query('INSERT INTO tags_group (group_name)' +
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
}

module.exports = new UserController()