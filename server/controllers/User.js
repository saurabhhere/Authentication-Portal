const Users = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto')

let transporter = nodemailer.createTransport({
    service: "Yahoo",
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
});

exports.register = async (req, res) => {
    try {
        let {registerUsername, registerEmail, registerPassword, registerCheckPassword} = req.body;

        // validate
        if (!registerUsername || !registerEmail || !registerPassword || !registerCheckPassword) {
            return res.status(400).json({
                msg: "Not all fields have been entered."
            });
        }
        if (registerPassword.length < 5) {
            return res.status(400).json({
                msg: "The password needs to be atleast 5 characters long"
            });
        }
        if (registerPassword != registerCheckPassword) {
            return res.status(400).json({
                msg: "Enter the same password twice for verification"
            })
        }
        if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(registerEmail).toLowerCase()))) {
            return res.status(400).json({
                msg: "Invalid Email"
            })
        }

        const existingUser = await Users.findOne({ email: registerEmail });
        if (existingUser) {
            return res.status(400).json({
                msg: "An account with this email already exists"
            });
        }
        console.log("registerImage", req.file);
        let registerImage = req.file ? req.file.filename : "default.png";

        const token = jwt.sign({ registerUsername, registerEmail, registerPassword, registerImage }, process.env.JWT_SECRET, { expiresIn: '20m' });

        const mail = `
        <p> Hello ${registerUsername}, </p>
        <p>Welcome to Spark demo Portal</p>
        <h3>Please click on given button to activate your account</h3>
        <a href=${process.env.CLIENT_URL}/authentication/activate/${token} style="margin:20px; padding: 20px; background: blue; color: white; text-decoration: none">Activate Account</a>
        <p>or paste this link in your browser</p>
        <p>${process.env.CLIENT_URL}/authentication/activate/${token}</p>    
        `

        let mailOptions = {
            from: '"Spark Portal" <saurabhguptajpr@yahoo.in>',
            to: registerEmail,
            subject: "Account Activation",
            html: mail
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent:', info.messageId);
            res.status(200).json({ message: "Email has been sent, kindly activate your account" });
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Login
exports.login = async (req, res) => {
    try {
        const { loginEmail, loginPassword } = req.body;
        // validate
        if (!loginEmail || !loginPassword) {
            return res.status(400).json({
                msg: "Not all fields have been entered."
            })
        };
        const user = await Users.findOne({ email: loginEmail });
        if (!user) {
            return res.status(400).json({
                msg: "No account with this email has been registered"
            });
        }
        const isMatch = await bcrypt.compare(loginPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                msg: "Invalid credentials"
            });
        }
        const payload = {
            id: user._id,
            name: user.username,
            email: user.email,
            image: user.image
          };
          console.log(payload);
        // we can add expiresIn parameter in sec
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 31556926});
        res.json({
            success: true,
            token
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.activateAccount = async (req, res) => {
    try {
        console.log("activate account", req.body);
        const { token } = req.body;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
                if (err){
                    return res.status(400).json({ error: "Incorrect or expired Link." })
                }
                const { registerUsername, registerEmail, registerPassword, registerImage } = decodedToken;
                const existingUser = await Users.findOne({ email: registerEmail });
                if (existingUser) {
                    return res.status(400).json({
                        msg: "An account with this email already exists"
                    });
                }
                const salt = await bcrypt.genSalt();
                const passwordHash = await bcrypt.hash(registerPassword, salt);
                const newUser = new Users({
                    username: registerUsername,
                    email: registerEmail,
                    password: passwordHash,
                    image: registerImage
                });
                const savedUser = await newUser.save();
                return res.status(200).json(savedUser);
            })
        } else {
            return res.json({ error: "Error in verifying account. Please try again" })
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await Users. findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.checkToken = async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.json(false);
        }
        const user = await Users.findById(verified.id);
        if (!user) return res.json(false);
        return res.json(true);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.getUser = async(req, res) => {
    const user = await Users.findById(req.user);
    res.json({
        id: user._id,
        username: user.username,
        email: user.email
    })
}

exports.getProfile = async(req, res) => {
    const {id} = req.params;
    console.log(id);
    try {
        const user = await Users.findById(id);
        res.json({
            id: user._id,
            username: user.username,
            email: user.email
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}


exports.getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(201).json(users);
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        let {resetEmail} = req.body;
        if (!resetEmail) {
            return res.status(400).json({
                msg: "Field can't be empty."
            });
        }
        const existingUser = await Users.findOne({email: resetEmail });
        if (!existingUser) {
            return res.status(400).json({
                msg: "No user exists with this mail."
            });
        }

        const newToken = crypto.randomBytes(32).toString("hex");

        Users.findOneAndUpdate({email: resetEmail}, {
            resetToken: newToken,
            expireToken: Date.now() + 3600000
        }).then((result) => {
            const mail = `
            <p> Hello ${result.username}, </p>
            <p>Welcome to Spark demo Portal</p>
            <h3>Please click on given button to reset your password</h3>
            <a href=${process.env.CLIENT_URL}/user/resetpassword/${newToken} style="margin:20px; padding: 20px; background: blue; color: white; text-decoration: none">Reset Password</a>
            <p>or paste this link in your browser</p>
            <p>${process.env.CLIENT_URL}/user/resetpassword/${newToken}</p>    
            `
    
            let mailOptions = {
                from: '"Spark Portal" <saurabhguptajpr@yahoo.in>',
                to: resetEmail,
                subject: "Reset Password",
                html: mail
            }
    
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent:', info.messageId);
                res.status(200).json({ message: "Email has been sent, kindly activate your account" });
            })
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        let {newPassword, newPasswordCheck, resetToken} = req.body;
        if (!newPassword || !newPasswordCheck) {
            return res.status(400).json({
                msg: "Not all fields have been entered."
            });
        }
        if (newPassword.length < 5) {
            return res.status(400).json({
                msg: "The password needs to be atleast 5 characters long"
            });
        }
        if (newPassword != newPasswordCheck) {
            return res.status(400).json({
                msg: "Enter the same password twice for verification"
            })
        }

        const user = await Users.findOne({resetToken: resetToken, expireToken: {$gt: Date.now()}});
        console.log(user);
    
        if (!user){
            return res.status(400).json({
                msg: "Try again session expired"
            })
        }

        const salt = await bcrypt.genSalt();
        const newPasswordHash = await bcrypt.hash(newPassword, salt); 
        Users.findOneAndUpdate(resetToken, {
            password: newPasswordHash,
            resetToken: "",
            expireToken: undefined
        }).then((savedUser) => {
            return res.status(200).json({message: "Password updated successfully"})
        })   
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}