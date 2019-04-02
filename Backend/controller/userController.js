const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require('../model/user.js'); // from the modal

const router = express.Router();


// signup (localhost:3000/signup)

router.post("/signup", (req,res) => {
    bcrypt.hash(req.body.password,10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                name: req.body.name,
                lastname: req.body.lastname,
                zipcode: req.body.zipcode
            });

            user.save()
                .then(result => {
                    res.json({
                            message: "the user has been created",
                            result: result
                    });
                })
                .catch(err =>{
                    res.json({ error: err });
                        });
        });
});

// sign in (localhost:3000/login)
router.post("/login", (req,res) => {
    let findUser;
    // mongodb search
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                return res.json({
                    message: "User Not Found"
                });
            }
            findUser = user;
            // compares the password thats inputed to the stored password
            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result => {
            if(!result){
                return res.json({
                    message: " Auth Failed "
                });
            }
            const token = jwt.sign(
                // the auto genertated _id from the collection in MONGODB
                { email: findUser.email, userId: findUser._id },
                "secret_longer",
                { expiresIn: "1h" }
            );
            //
            const name = findUser.name;
            const lastname = findUser.lastname;
            const email = findUser.email;
            const zipcode = findUser.zipcode;
            const id = findUser._id;

            res.json({
                name,
                lastname,
                token,
                email,
                zipcode,
                id,
                expiresIn: 10000 // ????
            });
        })
        .catch( err => { console.log(err) })
})

// get information
router.get('/info', (req,res) =>{
    User.find({})
        .then(data => {
            res.json({
                data
            })
        })
})


module.exports = router


