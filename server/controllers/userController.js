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

    async get_org(req, res, next) {
        try {
            const { org_id } = req.body
            let pool = await sql.connect(sqlConfig)
            let organization = await pool.request()
                .input('org_id', sql.Int, org_id)
                .query('SELECT org_id, org_name,simed_admin_pass ,remote_access, comment, city FROM organizations WHERE org_id = @org_id')

            if (organization.recordset.length == 0) return next(ApiError.internal('Ни одной организации не найдено'))

            return res.json(organization.recordset)
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
            // return res.json({ message: "Организация добавлена!" })
            let orgId = await pool.request()
            .input('org_name', sql.VarChar, org_name)
            .query('SELECT * FROM organizations WHERE org_name = @org_name')

            return res.json(orgId.recordset[0].org_id)
        } catch (e) {
            return res.json(e.message);
        }
    }

    async update_org(req, res, next) {
        try {
            const { org_id, org_name, simed_admin_pass, remote_access, city, comment } = req.body
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
                    'simed_admin_pass = @simed_admin_pass ' +
                    'WHERE org_id = @org_id')
            return res.json({ message: "Организация обновлена!" })
        } catch (e) {
            return res.json(e.message);
        }
    }

    // async delete_org(req, res, next) {
    //     try {
    //         const { org_id } = req.body
    //         let pool = await sql.connect(sqlConfig)
    //         await pool.request()
    //             .input('org_id', sql.Int, org_id)
    //             .query('DELETE FROM organizations WHERE org_id = @org_id')
    //         return res.json({ message: "Организация удалена!" })
    //     } catch (e) {
    //         return res.json(e.message);
    //     }
    // }
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

    async add_anydesk(req, res, next) {
        try {
            const { anydesk_id, org_id, anydesk_password } = req.body
            let pool = await sql.connect(sqlConfig)

            await pool.request()
                .input('anydesk_id', sql.VarChar, anydesk_id)
                .input('org_id', sql.Int, org_id)
                .input('anydesk_password', sql.VarChar, anydesk_password)
                .query('INSERT INTO anydesk (anydesk_id, org_id, anydesk_password)' +
                    'VALUES (@anydesk_id, @org_id, @anydesk_password)')
            return res.json({ message: "Anydesk добавлен!" })
        } catch (e) {
            return res.json(e.message);
        }
    }

    async update_anydesk(req, res, next) {
        try {
            const { anydesk_id, new_anydesk_id, anydesk_password } = req.body
            let pool = await sql.connect(sqlConfig)

            await pool.request()
                .input('anydesk_id', sql.VarChar, anydesk_id)
                .input('new_anydesk_id', sql.VarChar, new_anydesk_id)
                .input('anydesk_password', sql.VarChar, anydesk_password)
                .query('UPDATE anydesk SET anydesk_id = @new_anydesk_id, anydesk_password = @anydesk_password WHERE anydesk_id = @anydesk_id')
            return res.json({ message: "Anydesk добавлен!" })
        } catch (e) {
            return res.json(e.message);
        }
    }

    async delete_anydesk(req, res, next) {
        try {
            const { anydesk_id } = req.body
            let pool = await sql.connect(sqlConfig)

            await pool.request()
                .input('anydesk_id', sql.VarChar, anydesk_id)
                .query('DELETE anydesk WHERE anydesk_id = @anydesk_id')
            return res.json({ message: "Anydesk удален!" })
        } catch (e) {
            return res.json(e.message);
        }
    }

    async get_anydesk(req, res, next) {
        try {
            const { org_id } = req.body
            let pool = await sql.connect(sqlConfig)

            let anydesk = await pool.request()
                .input('org_id', sql.Int, org_id)
                .query('SELECT * FROM anydesk WHERE org_id = @org_id')
            return res.json(anydesk.recordset)
        } catch (e) {
            return res.json(e.message);
        }
    }

    async add_rdp(req, res, next) {
        try {
            const { org_id, vpn_ip, vpn_login, vpn_password, vpn_type, rdp_ip, rdp_login, rdp_password, windows_login, windows_password} = req.body
            let pool = await sql.connect(sqlConfig)

            await pool.request()
                .input('org_id', sql.Int, org_id)
                .input('vpn_ip', sql.VarChar, vpn_ip)
                .input('vpn_login', sql.VarChar, vpn_login)
                .input('vpn_password', sql.VarChar, vpn_password)
                .input('vpn_type', sql.VarChar, vpn_type)
                .input('rdp_ip', sql.VarChar, rdp_ip)
                .input('rdp_login', sql.VarChar, rdp_login)
                .input('rdp_password', sql.VarChar, rdp_password)
                .input('windows_login', sql.VarChar, windows_login)
                .input('windows_password', sql.VarChar, windows_password)
                .query('INSERT INTO rdp (org_id, vpn_ip, vpn_login, vpn_password, vpn_type, rdp_ip, rdp_login, rdp_password, windows_login, windows_password)' +
                    'VALUES (@org_id, @vpn_ip, @vpn_login, @vpn_password, @vpn_type, @rdp_ip, @rdp_login, @rdp_password, @windows_login, @windows_password)')
            return res.json({ message: "rdp добавлен!" })
        } catch (e) {
            return res.json(e.message);
        }
    }

    async update_rdp(req, res, next) {
        try {
            const { rdp_id, vpn_ip, vpn_login, vpn_password, vpn_type, rdp_ip, rdp_login, rdp_password, windows_login, windows_password} = req.body
            let pool = await sql.connect(sqlConfig)

            await pool.request()
                .input('rdp_id', sql.Int, rdp_id)
                .input('vpn_ip', sql.VarChar, vpn_ip)
                .input('vpn_login', sql.VarChar, vpn_login)
                .input('vpn_password', sql.VarChar, vpn_password)
                .input('vpn_type', sql.VarChar, vpn_type)
                .input('rdp_ip', sql.VarChar, rdp_ip)
                .input('rdp_login', sql.VarChar, rdp_login)
                .input('rdp_password', sql.VarChar, rdp_password)
                .input('windows_login', sql.VarChar, windows_login)
                .input('windows_password', sql.VarChar, windows_password)
                .query('UPDATE rdp SET vpn_ip = @vpn_ip, vpn_login = @vpn_login, vpn_password = @vpn_password, vpn_type = @vpn_type, rdp_ip = @rdp_ip, rdp_login = @rdp_login, rdp_password = @rdp_password, windows_login = @windows_login, windows_password = @windows_password WHERE rdp_id = @rdp_id')
            return res.json({ message: "rdp обновлено!" })
        } catch (e) {
            return res.json(e.message);
        }
    }

    async delete_rdp(req, res, next) {
        try {
            const { rdp_id } = req.body
            let pool = await sql.connect(sqlConfig)

            await pool.request()
                .input('rdp_id', sql.Int, rdp_id)
                .query('DELETE rdp WHERE rdp_id = @rdp_id')
            return res.json({ message: "rdp удалено!" })
        } catch (e) {
            return res.json(e.message);
        }
    }

    async get_rdp(req, res, next) {
        try {
            const { org_id } = req.body
            let pool = await sql.connect(sqlConfig)

            let rdp = await pool.request()
                .input('org_id', sql.Int, org_id)
                .query('SELECT * FROM rdp WHERE org_id = @org_id')
            return res.json(rdp.recordset)
        } catch (e) {
            return res.json(e.message);
        }
    }
}

module.exports = new UserController()