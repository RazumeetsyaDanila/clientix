const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.auth)
router.get('/get_orgs', authMiddleware, userController.get_orgs)
router.get('/get_tags', authMiddleware, userController.get_tags)
router.get('/get_tags_groups', authMiddleware, userController.get_tags_groups)
router.post('/add_org', authMiddleware, userController.add_org)
router.post('/add_anydesk', authMiddleware, userController.add_anydesk)
router.post('/get_anydesk', authMiddleware, userController.get_anydesk)
router.post('/add_rdp', authMiddleware, userController.add_rdp)
router.post('/get_rdp', authMiddleware, userController.get_rdp)
router.post('/update_org', authMiddleware, userController.update_org)
router.post('/get_org', authMiddleware, userController.get_org)
// router.post('/delete_org', authMiddleware, userController.delete_org)


module.exports = router