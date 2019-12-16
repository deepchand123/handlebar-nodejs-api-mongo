// Mongo DB
const db = require('./../services/db.service.js'),
    User = require('./../model/userModel.js');
//JSONWebToken
const jwt = require('jsonwebtoken');
//verify tiken
const verifyToken = require('../services/jsonWebTokenHelper');

    let userCreateFunction = (req, res) => {
        console.log("call create user api");
        let userCreateData = req.body;
        console.log(userCreateData);
        //check already exist mail id
        User.findOne({email: userCreateData.email}, (error, result) => {                    
            if(error){
                res.status(400).send({
                    status: 0,
                    msg: error,
                    data: []
                });
            }  
            else {
                console.log(result);                
                if(result){
                    console.log("If Condition");
                    res.status(200).send({
                        status: 1,
                        msg: 'Email Id is already Exist',
                        data: []
                    });
                } 
                else {
                    //Create new record
                    let user = new User(userCreateData);                
                    user.save((err, result) => {
                        if(err){
                            res.status(400).send({
                                status: 0,
                                msg: err,
                                data: []
                            });
                        } 
                        else {
                            let payload = {subject : result._id};
                            let token = jwt.sign(payload, 'scretkey', { expiresIn : "1h" });
                            res.status(200).send({
                                status: 1,
                                msg: 'User created successfully',
                                data: [{
                                    '_id': result._id,
                                    token: token
                                }]
                            });
                        }
                    }); 
                }                              
            }          
        });
                
    }

    let userListFunction = (req, res) => {
        console.log("call user list api");
        User.find((err, result) => {
            if (err){
                res.status(400).send({
                    status: 0,
                    msg: err,
                    data: []
                });
            } else{
                res.status(200).send({
                    status: 1,
                    msg: 'Get all user lists',
                    data: result
                });
            }
        }).limit(10);
    };

    let userDetailFunction = (req, res) => {
        console.log("call user detail api", req.params.id);
        User.findById('5d7d1f7a3f6416223bf94ff7', (err, result) => {
            if (err){
                res.status(400).send({
                    status: 0,
                    msg: err,
                    data: []
                });
            } else {
                res.status(200).send({
                    status: 1,
                    msg: 'Get user detail',
                    data: result
                });
            }
        });
    };

    let userUpdateFunction = (req, res) => {
        console.log("call user update api", req.params.id);
        User.findByIdAndUpdate('5d7d1f7a3f6416223bf94ff7', {$set: req.body}, (err, result) => {
            if (err){
                res.status(400).send({
                    status: 0,
                    msg: err,
                    data: []
                });
            } else {
                res.status(200).send({
                    status: 1,
                    msg: 'User detail is updated',
                    data: result
                });
            }
        });
    };

    let userDeleteFunction = (req, res) => {
        console.log("call user delete api", req.params.id);
        User.findByIdAndRemove('5d7d1f7a3f6416223bf94ff7', (err, result) => {
            if (err){
                res.status(400).send({
                    status: 0,
                    msg: err,
                    data: []
                });
            } else {
                res.status(200).send({
                    status: 1,
                    msg: 'User is deleted',
                    data: result
                });
            }
        });
    };

    let userLoginFunction = (req, res) => {
        console.log("call user login api");
        var userData = req.body;
        //console.log(userData);
        User.findOne({email: userData.email}, (err, result) => {            
            if (err){
                res.status(400).send({
                    status: 0,
                    msg: err,
                    data: {}
                });
            } else {
                if(!result){
                    res.status(200).send({
                        status: 403,
                        msg: 'Invalid Email',
                        data: {}
                    });
                } else {                    
                    //console.log(result);
                    if(result.password !== userData.password){
                        res.status(200).send({
                            status: 403,
                            msg: 'Invalid Password',
                            data: {}
                        });
                    } else {
                        let payload = {subject : result._id};
                        let token = jwt.sign(payload, 'scretkey', { expiresIn : "1h" });
                        res.status(200).send({
                            status: 1,
                            msg: 'User email and password is matched successfully',
                            data: {token: token}
                        });
                    }
                } 
            }
        });
    }

    module.exports = {
        createUser: userCreateFunction,
        getUsers: userListFunction,
        getSingleUser: userDetailFunction,
        deleteUser: userDeleteFunction, 
        updateUser: userUpdateFunction,
        login: userLoginFunction
    }