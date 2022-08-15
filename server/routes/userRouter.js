const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.auth)
router.get('/get_orgs', authMiddleware, userController.get_orgs)
router.post('/add_org', authMiddleware, userController.add_org)
router.post('/update_org', authMiddleware, userController.update_org)
router.post('/delete_org', authMiddleware, userController.delete_org)

module.exports = router