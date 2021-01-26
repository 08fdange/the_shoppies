// api-routes.js

// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Working',
        message: 'Welcome to The Shoppies API!',
    });
});

// Import user controller
var userController = require('../controllers/userController');
var nominationController = require('../controllers/nominationController')

// User routes
router.route('/users')
    .get(userController.index)
    .post(userController.new);
router.route('/users/:email')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

// Nomination routes
router.route('/users/:email/nominations')
    .get(nominationController.index)
    .post(nominationController.new)
router.route('/users/:email/nominations/:id')
    .delete(nominationController.delete)
// Export API routes
module.exports = router;