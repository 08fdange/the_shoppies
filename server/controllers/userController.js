// User Controller

// Import user model
User = require('../models/User');

// Handle index actions
exports.index = async function (req, res) {
    try{
        const users = await User.find();
        res.json(users)
    } catch (err) {
        res.json({message: err})
    }
};

// Handle create user actions
exports.new = async function (req, res) {
    const user = new User({
        email: req.body.email
    });

    try{
        const savedUser = await user.save()
        res.json(savedUser)
    } catch (err) {
        res.json({message: err})
    }
};

// Handle view user info
exports.view = async function (req, res) {
    try{
        const user = await User.findOne({ email: req.params.email});
        res.json(user)
    }
    catch (err) {
        res.json({
            message: err
        })
    }
};

// Handle update user info
exports.update = function (req, res) {
User.findOne({email: req.params.email}, function (err, user) {
        if (err)
            res.send(err);
        user.email = req.body.email;
// save the contact and check for errors
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'User Info updated',
                data: user
            });
        });
    });
};

// Handle delete user
exports.delete = function (req, res) {
    User.removeOne({email: req.params.email}, function (err, user) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'User deleted'
        });
    });
};