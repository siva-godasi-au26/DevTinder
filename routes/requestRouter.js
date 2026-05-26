const Router = require('router')
const router = Router();
const {sendConnectionRequest,reviewConnectionRequest} = require('../controllers/requestController')
const {userAuth} = require('../middlewares/auth')

router.post('/request/send/:status/:toUserId',userAuth,sendConnectionRequest)
router.post('/request/review/:status/:requestId',userAuth,reviewConnectionRequest)

module.exports = router