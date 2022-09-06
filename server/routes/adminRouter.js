const Router = require('express')
const router = new Router()
const adminController = require('../controllers/adminController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/registration',  adminController.registration)
router.post('/delete_user', checkRoleMiddleware('admin'), adminController.delete_user)
router.get('/get_users', checkRoleMiddleware('admin'), adminController.get_users)

module.exports = router