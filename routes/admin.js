const express = require("express")
const adminController = require("../controllers/admin")
const chceckAuthMiddleware = require("../middleware/check-auth")
const router = express.Router()

router.post('/adminSignUp',adminController.signUpAdmin)

router.post('/adminLogin',adminController.loginAdmin)

module.exports = router