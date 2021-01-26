// Nomination Controller

const User = require('../models/User');

// Import nomination model
// const Nomination = require('../models/Nomination');

//Handle index actions
exports.index = async function (req, res) {
    try{
        const user =  await User.findOne({email: req.params.email});
        const nominations = user.nominations;
        res.json(nominations);
    } catch (err) {
        res.json({
            message: err
        })
    }
};

// Handle create nomination actions
exports.new = async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
    user.nominations.push({
        Title: req.body.Title,
        Year: req.body.Year,
        Actors: req.body.Actors,
        Rated: req.body.Rated,
        Plot: req.body.Plot,
        Poster: req.body.Poster,
    })
    
    try{
        const savedUser = await user.save();
        res.json(savedUser);
    } catch {
        res.json("Did not work")
    }
};

exports.delete = async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
 
        const filterArray = function(nomination) {
            return nomination._id != req.params.id;
        }

        const newNominations = await user.nominations.filter(filterArray)
        user.nominations = newNominations;
        const savedUser = await user.save();
        res.json(savedUser);
        
}
