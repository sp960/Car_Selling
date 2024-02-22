const crypto = require("crypto");
const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Validator = require('fastest-validator');


//For Create a New admin
const signUpAdmin = async (req, res) => {
            try {
                const existingAdmin = await models.Auth.findOne({ where: { Name: req.body.Name } });
        
                if (existingAdmin) {
                    return res.status(409).json({
                        message: "User Already Exists"
                    });
                }
        
                const salt = await bcryptjs.genSalt(10);
                const hashedPassword = await bcryptjs.hash(req.body.Password, salt);
        
                const admin = {
                    Name: req.body.Name,
                    Password: hashedPassword,
                };
        
                const createdAdmin = await models.Auth.create(admin);
        
                res.status(201).json({
                    message: "User Created Successfully",
                    admin: createdAdmin // Return the created user if needed
                });
            } catch (error) {
                res.status(500).json({
                    message: "Error creating user",
                    error: error.message || "Something went wrong"
                });
            }
        };
        
//TO login  User
const loginAdmin = async (req, res) => {
    try {
        const admin = await models.Auth.findOne({ where: { Name: req.body.Name } });

        if (!admin) {
            return res.status(409).json({
                message: "Admin Doesn't exist"
            });
        }

        bcryptjs.compare(req.body.Password, admin.Password, (err, result) => {
            if (result) {
                const token = jwt.sign({
                    Name: admin.Name,
                    adminId : admin.id
                }, process.env.JWT_KEY, (err, token) => {
                    res.status(200).json({
                        message: "Authentication Successful",
                        token : token,
                    });
                });
            } else {
                res.status(409).json({
                    message: "Invalid Password"
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error: " + error.message
        });
    }
};

module.exports = {
   signUpAdmin : signUpAdmin,
   loginAdmin : loginAdmin
};
