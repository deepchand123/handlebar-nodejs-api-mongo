var express = require('express');
var router = express.Router();
//call controller
var userController = require('../../controller/user.controller');
//verify tiken
const verifyToken = require('../../services/jsonWebTokenHelper');

//create user
router.post('/createUser', userController.createUser);
//login user
router.post('/login', userController.login);
//logout user
router.post('/logout', verifyToken.verifyToken, userController.logout);
//all user list
//router.get('/getUsers', userController.getUsers);
router.get('/getUsers', verifyToken.verifyToken, userController.getUsers);
//single user detail
//router.get('/getUsers/:id', userController.getSingleUser);
router.get('/getUsers/:id', verifyToken.verifyToken, userController.getSingleUser);
//update user detail
//router.put('/updateUser/:id', userController.updateUser);
router.put('/updateUser/:id', verifyToken.verifyToken, userController.updateUser);
//delete user
//router.delete('/deleteUser/:id', userController.deleteUser);
router.delete('/deleteUser/:id', verifyToken.verifyToken, userController.deleteUser);

module.exports = router;
