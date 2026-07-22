const express = require('express');
const {signUp,logIn,sendMessage}= require('../controllers/controllers');
const { fetchUsersController, updateUserRoleController,deleteUserController } = require("../controllers/update-user-controller");
const authMiddleware = require("../middleware/AUTH-middleware");
const isadmin = require("../middleware/admin-middleware");
const router = express.Router();

router.delete("/users/:id/delete", authMiddleware, isadmin, deleteUserController);
router.get("/users", authMiddleware, isadmin, fetchUsersController);
router.put("/users/:id/role", authMiddleware, isadmin, updateUserRoleController);
router.post('/signUp',signUp);
router.post('/login',logIn);
router.post('/sendMessage',sendMessage);


module.exports = router;
  